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

// вопросы по 2 раза пользователю, через цикл
for( let i = 0; i < 2; i++) {
    
    let question1One = prompt('Введите обязательную статью расходов в этом месяце', ''),
        question2One = +prompt('Во сколько обойдется?', '');
    
    if( (typeof(question1One)) === 'string' && (typeof(question1One)) != null && (typeof(question2One)) != null 
    && question1One !== '' && question2One !== '' )
    {
        console.log("ok");
        // запись ответа пользвователя в объект
        appData[question1One] = question2One;
    }
    else 
    {
        console.log("not");
        i--;
    }
} 

//расчет ежедневного бюджета
appData.moneyPerDay = appData.budget / 30;

// вывод пользователю
alert('Ежедневный бюджет: ' + appData.moneyPerDay);

// вывод сообщения достатка
let messageStat = '';
if(appData.moneyPerDay < 4200)
{
    messageStat = 'Нищий человек';
}
else if(appData.moneyPerDay > 4200 && appData.moneyPerDay < 7000)
{
    messageStat = 'Полубедняк';
}
else if(appData.moneyPerDay > 7000)
{
    messageStat = 'Жить можно';
}



console.log(appData);
alert(messageStat);