// ДЗ № 7
// получаем кнопку старт
let start = document.getElementById('start');

// получаем класс Выводы иформации о бюджете
let classResultTable = document.querySelector('.result-table');
// получаем массив класса с элементами
let arrayClassResultTable = classResultTable.querySelectorAll('div');

// получаем класс времени и даты
let classTimeData = document.querySelector('.time-data');
// получаем массив класса с элементами
let arrayClassTimeData = classTimeData.querySelectorAll('div');

// получаем массив класса с элементами input Обязательных расходов
let arrayClassExpensesItem = document.getElementsByClassName('expenses-item');

// получаем массив класса с элементами input Необязательных расходов
let arrayClassOptionalexpensesItem = document.querySelectorAll('.optionalexpenses-item');

// получаем class где лежат кнопки
let classButtons = document.querySelector('.data');
// получаю все кнопки с класса Data
let tagsButtons = classButtons.getElementsByTagName('button');
// получаем кнопку Утвердить с обязательных рассходов
let expensesItemBtnApprove = tagsButtons[0];
// получаем кнопку Утвердить с необязательных рассходов
let optionalExpensesBtnApprove = tagsButtons[1];
// получаем кнопку Рассчитать
let countBudgetBtnCalculate = tagsButtons[2];

// получаем Статью возможного дохода
let chooseIncome = document.querySelector('.choose-income');

// получаем input с накомлениями
let accumulationInput = document.querySelector('#savings');

//получаем input с суммой накопления
let sumInput = document.querySelector('#sum');

//получаем input с процентами
let percentInput = document.querySelector('#percent');
// ДЗ № 7 end
//делаем переменные глобальными
let money, time;
// ф-я с воросы и проверкой
function start() 
{
    // ф-я которая будет возращать нам ответ в виде типа Number, так как мы поставиили унарный плюч прерд ней
    money = +prompt('Ваш бюджет на месяц? (Пример: 5000)', '');
    // ф-я будет возращать нам строку с датой
    time = prompt('Ввидите дату в формате: YYYY-MM-DD. (Пример: 2020-06-14)', '');

    //
    while( isNaN(money) || money == '' || money == null) 
    {
        money = +prompt('Ваш бюджет на месяц? (Пример: 5000)', '');
    }
}
// запуск ф-и
start();

// объект с данными от пользователя
let appData = {
    budget: money,
    time: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: true,
    chooseExpenses: function () 
    {
        // вопросы по 2 раза пользователю, через цикл
        for( let i = 0; i < 2; i++ ) 
        {
            
            let question1One = prompt('Введите обязательную статью расходов в этом месяце', ''),
                question2One = +prompt('Во сколько обойдется?', '');
            
            if( (typeof(question1One)) === 'string' && (typeof(question1One)) != null && (typeof(question2One)) != null 
            && question1One !== '' && question2One !== '' )
            {
                // запись ответа пользвователя в объект
                appData.expenses[question1One] = question2One;
            }
            else 
            {
                i--;
            }
        }
    },
    chooseOptExpenses: function ()
    {
        for( let i = 1; i < 4; i++ )
        {
            // спрашиваем у пользователя
            let chooseOptExpenses = prompt('Статья необязательных расходов?');
            // проверяем на не пустую и не null
            if(chooseOptExpenses !='' && (typeof(chooseOptExpenses)) != null && (typeof(chooseOptExpenses)) == 'string')
            {
                // запись в объект
                appData.optionalExpenses[i] =  chooseOptExpenses;
            }
            else{
                i--;
            }
        }
    },
    detectDayBudget: function ()
    {
        //расчет ежедневного бюджета c округлением до целого числа
        appData.moneyPerDay = (appData.budget / 30).toFixed(1);
        // вывод пользователю
        alert('Ежедневный бюджет: ' + appData.moneyPerDay);
    },
    detectLevel: function ()
    {
        // вывод сообщения достатка
        let messageStat = '';
        if(appData.moneyPerDay < 200)
        {
            messageStat = 'Нищий человек';
        }
        else if(appData.moneyPerDay > 200 && appData.moneyPerDay < 400)
        {
            messageStat = 'Полубедняк';
        }
        else if(appData.moneyPerDay > 400)
        {
            messageStat = 'Жить можно';
        }

        alert(messageStat);
    },
    checkSavings: function ()
    {
        if(appData.saving == true)
        {
            let save = +prompt('Какова сумма накоплений? (Пример: 1000)', ''),
                percent = +prompt('Под какой процент? (Пример: 12%)', '');
                // расчитываем доход с депозита в месяц и записываем в объект
                appData.mothIncome = save/100/12*percent;
                alert('Доход в месяц с вашего депозита: ' + appData.mothIncome);
        }
    },
    chooseIncome: function ()
    {
        let items = prompt('Что принесет дополнительный доход? (перечислите через запятую)', '');
        if( (typeof(items)) != 'string' && items == null && items == '' )
        {
            items = prompt('Что принесет дополнительный доход? (перечислите через запятую)', '');
        }
        else
        {
            // создаем массив с дополнительным доходом
            appData.income = items.split(",");
            /*ошибка была в том что стол пробел перед запятойsplit(" ,")*/
            // не забыл ли пользователь указать что то еще
            appData.income.push(prompt('Может что то еще?!', ''));
            // сортируем по порядку
            appData.income.sort();
        }
        // вывожим полученые способы от пользователя
        appData.income.forEach (function (itemmass, i) {
            alert('Ваши допольнительные заработки: ' + (i + 1) + '-' + itemmass);
        });
    }
};

for(let key in appData)
{
    console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}