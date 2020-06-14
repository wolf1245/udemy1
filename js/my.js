// ф-я которая будет возращать нам ответ в виде типа Number, так как мы поставиили унарный плюч прерд ней
let money = +prompt('Ваш бюджет на месяц?', 'Пример: 5000');
// ф-я будет возращать нам строку с датой
let time = prompt('Ввидите дату в формате: YYYY-MM-DD.', 'Пример: 2020-06-14');

// объект с данными от пользователя
let appData = {
    budget: money,
    time: time,
    expenses: {},
    optionExpenses: {},
    income: [],
    saving: false
};

// вопросы по 2 раза пользователю
let question1One = prompt('Введите обязательную статью расходов в этом месяце', ''),
    question2One = prompt('Во сколько обойдется?', ''),
    question1Two = prompt('Введите обязательную статью расходов в этом месяце', ''),
    question2Two = prompt('Во сколько обойдется?', '');
// запись ответа пользвователя в объект
appData.expenses[question1One] = question2One;
appData.expenses[question1Two] = question2Two;
console.log(appData.expenses);

alert(appData.budget / 30);