//делаем переменные глобальными
let money, time;
// ф-я с воросы и проверкой
function start() 
{
    // ф-я которая будет возращать нам ответ в виде типа Number, так как мы поставиили унарный плюч прерд ней
    money = +prompt('Ваш бюджет на месяц?', 'Пример: 5000');
    // ф-я будет возращать нам строку с датой
    time = prompt('Ввидите дату в формате: YYYY-MM-DD.', 'Пример: 2020-06-14');

    //
    while( isNaN(money) || money == '' || money == null) 
    {
        money = +prompt('Ваш бюджет на месяц?', 'Пример: 5000');
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
    saving: true
};

// ф-я с вопросами трат
function chooseExpenses() 
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
}
 
// запуск ф-и
chooseExpenses();

//
function chooseOptExpenses() 
{
    for(let i = 1; i < 4; i++ )
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
}

// вызов ф-и
chooseOptExpenses();
// ф-я дневного бюджета
function detectDayBudget() 
{
    //расчет ежедневного бюджета c округлением до целого числа
    appData.moneyPerDay = (appData.budget / 30).toFixed(1);
    // вывод пользователю
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
}

// запуск ф-и
detectDayBudget();

// ф-я достатка
function detectLevel() 
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
}

// запуск ф-и достатка
detectLevel();

// ф-я накоплений
function checkSavings() 
{
    if(appData.saving == true)
    {
        let save = +prompt('Какова сумма накоплений?', 'Пример: 1000'),
            percent = +prompt('Под какой процент?', 'Пример: 12%');
            // расчитываем доход с депозита в месяц и записываем в объект
            appData.mothIncome = save/100/12*percent;
            alert('Доход в месяц с вашего депозита: ' + appData.mothIncome);
    }
}
checkSavings();

console.log(appData);