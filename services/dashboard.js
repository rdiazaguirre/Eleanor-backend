const Schema = require('../db/schemas/task-perfomance');
const MetricsSchema = require('../db/schemas/metric');
const { readAllCardByBranchOfficeId } = require('./board');
const { readAllReception } = require('./reception');
const { getAllEvaluation } = require('./evaluation');
const { getQuotations } = require('./quotation');
const { getAllAssigWorks } = require('./assign-work');
const { readWorker } = require('./worker');
const { readStage } = require('./stage');
exports.taskPerfomance = async (model) => {
    let tasks = await _getTasks(model.branchOfficeId);
    if (!tasks || tasks.length === 0) {
        return null;
    }
    let startDate = new Date();
    let endDate = new Date();
    if (model.startDate) {
        startDate = new Date(
            model.startDate.year,
            model.startDate.month - 1,
            model.startDate.day,
            -4, 0, 0);
    }
    if (model.endDate) {
        endDate = new Date(
            model.endDate.year,
            model.endDate.month - 1,
            model.endDate.day,
            19, 59, 59);
    }
    tasks = tasks.filter(item => (item.date1 >= startDate) && (item.date1 <= endDate));
    const completedTasks = tasks.filter(item => item.finished);
    const activesTasks = tasks.filter(item => !item.finished);
    const overdueTasks = _getOverdueTasks(activesTasks);
    let tasksCount = 1;
    if (tasks.length > 0) {
        tasksCount = tasks.length;
    }
    const response = {
        completed: (completedTasks.length / tasksCount) * 100,
        actives: (activesTasks.length / tasksCount) * 100,
        overdue: (overdueTasks.length / tasksCount) * 100,
        branchOfficeId: model.branchOfficeId
    };
    return response;
}
exports.generateTaskPerfomance = async (date, branchOfficeId) => {
    const startDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    startDate.setHours(-4);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    const endDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    endDate.setHours(19);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    let taskPerfomance = await Schema.find({ branchOfficeId: { $eq: branchOfficeId } });
    taskPerfomance = taskPerfomance.filter(task => (task.date >= startDate) && (task.date <= endDate));

    if (taskPerfomance && taskPerfomance.length > 0) {
        _updateTask(taskPerfomance[0], branchOfficeId);
        return;
    }

    _createTask(endDate, branchOfficeId);
}
const _updateTask = async (taskPerfomance, branchOfficeId) => {
    const tasks = await _getTasks(branchOfficeId);
    const completedTasks = tasks.filter(item => item.finished);
    const activesTasks = tasks.filter(item => !item.finished);
    const overdueTasks = _getOverdueTasks(activesTasks);

    let tasksCount = 1;
    if (tasks.length > 0) {
        tasksCount = tasks.length;
    }
    taskPerfomance.completed = (completedTasks.length / tasksCount) * 100;
    taskPerfomance.actives = (activesTasks.length / tasksCount) * 100;;
    taskPerfomance.overdue = (overdueTasks.length / tasksCount) * 100;

    await Schema.updateOne({ _id: taskPerfomance._id }, taskPerfomance);
}
const _createTask = async (date, branchOfficeId) => {
    const tasks = await _getTasks(branchOfficeId);
    const completedTasks = tasks.filter(item => item.finished);
    const activesTasks = tasks.filter(item => !item.finished);
    const overdueTasks = _getOverdueTasks(activesTasks);
    let tasksCount = 1;
    if (tasks.length > 0) {
        tasksCount = tasks.length;
    }
    const newTaskPerformance = {
        completed: (completedTasks.length / tasksCount) * 100,
        actives: (activesTasks.length / tasksCount) * 100,
        overdue: (overdueTasks.length / tasksCount) * 100,
        date: date,
        branchOfficeId: branchOfficeId
    };

    await Schema.create(newTaskPerformance);
}
const _getOverdueTasks = (tasks) => {
    const response = [];

    if (!tasks) {
        return [];
    }

    for (const task of tasks) {
        if (task.finished) {
            continue;
        }

        const today = new Date();
        const taskEndDate = new Date(task.endDate.year, task.endDate.month - 1, task.endDate.day);
        if (taskEndDate < today) {
            response.push(task);
        }
    }
    return response;
}
const _getTasks = async (branchOfficeId) => {
    const response = [];
    const cardsOfBranch = await readAllCardByBranchOfficeId(branchOfficeId);
    for (const card of cardsOfBranch) {
        if (card.works) {
            for (const work of card.works) {
                response.push({
                    startDate: work.startDate,
                    endDate: work.endDate,
                    _id: work._id,
                    workerId: work.workerId,
                    task: work.task,
                    finished: work.finished,
                    date1: new Date(work.startDate.year, work.startDate.month - 1, work.startDate.day),
                    date2: new Date(work.endDate.year, work.endDate.month - 1, work.endDate.day)
                });
            }
        }
    }
    return response;
}
exports.completedTask = async (model) => {
    const tasks = await _getTasks(model.branchOfficeId);
    if (!tasks || tasks.length === 0) {
        return null;
    }
    let startDate = new Date();
    let endDate = new Date();
    if (model.startDate) {
        startDate = new Date(
            model.startDate.year,
            model.startDate.month - 1,
            model.startDate.day,
            -4, 0, 0);
    }
    if (model.endDate) {
        endDate = new Date(
            model.endDate.year,
            model.endDate.month - 1,
            model.endDate.day,
            19, 59, 59);
    }
    let days = Math.abs(startDate.getTime() - endDate.getTime());
    days = Math.ceil(days / (1000 * 3600 * 24));
    if (days <= 7) {
        return await _completedTaskDaily(startDate, endDate, tasks);
    }
    if (days <= 30) {
        return await _completedTaskWeekly(startDate, endDate, tasks);
    }
    if (days <= 365) {
        return await _completedTaskMonthly(startDate, endDate, tasks);
    }
    return await _completedTaskYearly(startDate, endDate, tasks);
}
const _completedTaskYearly = async (startDate, endDate, tasks) => {
    const response = [];
    let date = new Date(startDate);

    endDate.setHours(19);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    let year = []
    while (date <= endDate) {
        while (year.length <= 365) {
            const taskByDate = _getTasksByDate(date, tasks);
            const mes = (date.getUTCMonth() + 1);
            const period = {
                date: `${date.getUTCFullYear()}-${mes}-${date.getUTCDate()}`,
                value: taskByDate.length
            };
            year.push(period);
            date.setDate(date.getDate() + 1);
        }

        let completedTasks = 0;
        for (let index = 0; index < year.length; index++) {
            const item = year[index];
            completedTasks += item.value;
        }
        const period = {
            name: `${year[0].date}`,
            value: completedTasks
        };
        response.push(period);
        year = [];
    }
    return response;
}
const _completedTaskMonthly = async (startDate, endDate, tasks) => {
    const response = [];
    let date = new Date(startDate);

    endDate.setHours(19);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    let month = []
    while (date <= endDate) {
        while (month.length <= 30) {
            const taskByDate = _getTasksByDate(date, tasks);
            const mes = (date.getUTCMonth() + 1);
            const period = {
                date: `${date.getUTCFullYear()}-${mes}-${date.getUTCDate()}`,
                value: taskByDate.length
            };
            month.push(period);
            date.setDate(date.getDate() + 1);
        }

        let completedTasks = 0;
        for (let index = 0; index < month.length; index++) {
            const item = month[index];
            completedTasks += item.value;
        }
        const period = {
            name: `Mes ${month[0].date}`,
            value: completedTasks
        };
        response.push(period);
        month = [];
    }
    return response;
}
const _completedTaskWeekly = async (startDate, endDate, tasks) => {
    const response = [];
    let date = new Date(startDate);

    endDate.setHours(19);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    let week = []
    while (date <= endDate) {
        while (week.length <= 7) {
            const taskByDate = _getTasksByDate(date, tasks);
            const month = (date.getUTCMonth() + 1);
            const period = {
                date: `${date.getUTCFullYear()}-${month}-${date.getUTCDate()}`,
                value: taskByDate.length
            };
            week.push(period);
            date.setDate(date.getDate() + 1);
        }

        let completedTasks = 0;
        for (let index = 0; index < week.length; index++) {
            const item = week[index];
            completedTasks += item.value;
        }
        const period = {
            name: `Sem ${week[0].date}`,
            value: completedTasks
        };
        response.push(period);
        week = [];
    }
    return response;
}
const _completedTaskDaily = async (startDate, endDate, tasks) => {
    const response = [];
    let date = new Date(startDate);

    endDate.setHours(19);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    while (date <= endDate) {

        const taskByDate = _getTasksByDate(date, tasks);
        const month = (date.getUTCMonth() + 1);
        const period = {
            name: `${date.getUTCFullYear()}-${month}-${date.getUTCDate()}`,
            value: taskByDate.length
        };
        response.push(period);
        date.setDate(date.getDate() + 1);

    }
    return response;
}
const _getTasksByDate = (date, tasks) => {
    var response = [];
    for (const task of tasks) {
        const startAt = new Date(task.startDate.year, task.startDate.month - 1, task.startDate.day);

        if (
            (date.getUTCFullYear() === startAt.getUTCFullYear()) &&
            (date.getUTCMonth() === startAt.getUTCMonth()) &&
            (date.getUTCDate() === startAt.getUTCDate())) {
            response.push(task);
        }
    }
    return response;
}
const _getTasksByDates = (startDate, endDate, tasks) => {
    let response = [];
    for (const task of tasks) {
        const date1 = new Date(task.startDate.year, task.startDate.month - 1, task.startDate.day);
        const date2 = new Date(task.endDate.year, task.endDate.month - 1, task.endDate.day);
        date2.setHours(19);
        date2.setMinutes(59);
        date2.setSeconds(59);
        response.push({
            startDate: task.startDate,
            endDate: task.endDate,
            _id: task._id,
            workerId: task.workerId,
            task: task.task,
            date1: date1,
            date2: date2,
            finished: task.finished
        });
    }
    response = response.filter(task => (task.date1 >= startDate) && (task.date1 <= endDate));
    return response;
}
exports.executionWorks = async (model) => {
    let startDate = new Date();
    let endDate = new Date();
    if (model.startDate) {
        startDate = new Date(
            model.startDate.year,
            model.startDate.month - 1,
            model.startDate.day,
            -4, 0, 0);
    }
    if (model.endDate) {
        endDate = new Date(
            model.endDate.year,
            model.endDate.month - 1,
            model.endDate.day,
            19, 59, 59);
    }
    let cards = await readAllCardByBranchOfficeId(model.branchOfficeId);
    cards = cards.filter(item => (item.createdAt >= startDate) && (item.createdAt <= endDate));
    const classes = [
        'bg-success',
        'bg-info',
        'bg-warning',
        'bg-danger'
    ];
    const response = [];
    let ic = 0;
    for (const card of cards) {
        let stage = await readStage(card.stageId);
        if (!stage) {
            stage = { shortName: 'ND' };
        }
        let worksCount = card.works.length;
        let workCompleted = card.works.filter(item => item.finished).length;
        if (worksCount === 0) {
            worksCount = 1;
        }
        const date = new Date(card.planification.endDate.year, card.planification.endDate.month - 1, card.planification.endDate.day);
        const today = new Date();
       
        let days = (date.getTime() - today.getTime());
        days = Math.ceil(days / (1000 * 3600 * 24));

        let clase = classes[1];
        if (days <= 5) {
            clase = classes[2];
        }
        if (days <= 0) {
            clase = classes[3];
        }
        response.push({
            stage: { shortName: stage.name.substring(0, 2) },
            class: clase,
            createdBy: { avatar: card.createdByUser.avatar },
            vehicle: { plate: card.vehicle.plate },
            progress: ((workCompleted / worksCount) * 100),
            createdAt: card.createdAt,
            endDate: date
        });

    }


    return response;
}
exports.workersRankingTask = async (model) => {
    let startDate = new Date();
    let endDate = new Date();
    if (model.startDate) {
        startDate = new Date(
            model.startDate.year,
            model.startDate.month - 1,
            model.startDate.day,
            -4, 0, 0);
    }
    if (model.endDate) {
        endDate = new Date(
            model.endDate.year,
            model.endDate.month - 1,
            model.endDate.day,
            19, 59, 59);
    }
    let tasks = await _getTasks(model.branchOfficeId);
    tasks = _getTasksByDates(startDate, endDate, tasks);
    let response = [];
    for (const task of tasks) {
        const worker = await readWorker(task.workerId);
        const workerTaks = tasks.filter(item => item.workerId === task.workerId);
        const workerTaksComplete = workerTaks.filter(item => item.finished);
        const workerTaksActives = workerTaks.filter(item => !item.finished);
        const workerTaksOverdue = _getOverdueTasks(workerTaksActives);

        response = response.filter(item => !item.workerId.equals(task.workerId));
        let workerTasksCount = workerTaks.length;
        if (workerTasksCount === 0) {
            workerTasksCount = 1;
        }
        response.push({
            avatar: worker.avatar,
            name: worker.name,
            workerId: worker._id,
            tasks: {
                complete: { percent: ((workerTaksComplete.length / workerTasksCount) * 100), count: workerTaksComplete.length },
                actives: { percent: ((workerTaksActives.length / workerTasksCount) * 100), count: workerTaksActives.length },
                overdue: { percent: ((workerTaksOverdue.length / workerTasksCount) * 100), count: workerTaksOverdue.length }
            }
        });

    }
    return response;
}
exports.metrics = async (model) => {
    let startDate = new Date();
    let endDate = new Date();
    if (model.startDate) {
        startDate = new Date(
            model.startDate.year,
            model.startDate.month - 1,
            model.startDate.day,
            -4, 0, 0);
    }
    if (model.endDate) {
        endDate = new Date(
            model.endDate.year,
            model.endDate.month - 1,
            model.endDate.day,
            19, 59, 59);
    }
    const response = _createMetric(startDate, endDate, model.branchOfficeId);
    return response;
}
const _createMetric = async (startDate, endDate, branchOfficeId) => {
    const receptions = await _getReceptions(startDate, endDate, branchOfficeId);
    const evaluations = await _getEvaluatons(startDate, endDate, branchOfficeId);
    const quotations = await _getQuotations(startDate, endDate, branchOfficeId);
    const assignedworks = await _getAssingedWorks(startDate, endDate, branchOfficeId);
    const works = await _getWorks(startDate, endDate, branchOfficeId);
    const metric = {
        metrics: [
            { name: 'recepciones', value: receptions.length, icon: 'fas fa-car-crash' },
            { name: 'evaluaciones', value: evaluations.length, icon: 'oi oi-fork' },
            { name: 'cotizaciones', value: quotations.length, icon: 'fas fa-project-diagram' },
            { name: 'asignación de trabajos', value: assignedworks.length, icon: 'oi oi-people' }
        ], works: works.length,
        date: endDate,
        branchOfficeId: branchOfficeId
    };
    return metric;
}
const _getReceptions = async (startDate, endDate, branchOfficeId) => {
    let response = await readAllReception(null, branchOfficeId);
    response = response.filter(item => (item.createAt >= startDate) && (item.createAt <= endDate));
    return response;
}
const _getEvaluatons = async (startDate, endDate, branchOfficeId) => {
    let response = await getAllEvaluation(null, branchOfficeId);
    response = response.filter(item => (item.createAt >= startDate) && (item.createAt <= endDate));
    return response;
}
const _getQuotations = async (startDate, endDate, branchOfficeId) => {
    let response = await getQuotations(null, branchOfficeId);
    response = response.filter(item => (item.createAt >= startDate) && (item.createAt <= endDate));
    return response;
}
const _getAssingedWorks = async (startDate, endDate, branchOfficeId) => {
    let response = await getAllAssigWorks(null, branchOfficeId);
    response = response.filter(item => (item.createAt >= startDate) && (item.createAt <= endDate));
    return response;
}
const _getWorks = async (startDate, endDate, branchOfficeId) => {
    const cards = await readAllCardByBranchOfficeId(branchOfficeId);
    let response = [];
    for (const card of cards) {
        for (const work of card.works) {
            if (work.finished) {
                continue;
            }
            const workToPush = {
                startAt: new Date(work.startDate.year, work.startDate.month - 1, work.startDate.day),
            };
            response.push(workToPush);
        }
    }
    // actives works
    response = response.filter(item => (item.startAt >= startDate) && (item.startAt <= endDate));
    return response;
}