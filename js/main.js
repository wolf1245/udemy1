// ДЗ № 7
// получаем кнопку старт
let startBtn = document.getElementById('start');

// получаем класс Вывода иформации о бюджете
let classResultTable = document.querySelector('.result-table');
// получаем массив класса с элементами
let arrayClassResultTable = classResultTable.querySelectorAll('div');

// получаем класс времени и даты
let classTimeData = document.querySelector('.time-data');
// получаем массив класса с элементами
let arrayClassTimeData = classTimeData.querySelectorAll('input');

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
let accumulationCheckBox = document.querySelector('#savings');

//получаем input с суммой накопления
let sumInput = document.querySelector('#sum');

//получаем input с процентами
let percentInput = document.querySelector('#percent');
// ДЗ № 7 end
//делаем переменные глобальными
let money, time;

//делаем кнопки неактивными
for(let i = 0; i < (tagsButtons.length - 1); i++)
{
    tagsButtons[i].setAttribute('disabled', 'disabled');
}
// при нажатии на кнопку старт
startBtn.addEventListener('click', function() {
    // ф-я будет возращать нам строку с датой
    time = prompt('Ввидите дату в формате: YYYY-MM-DD. (Пример: 2020-06-14)', '');
    // ф-я которая будет возращать нам ответ в виде типа Number, так как мы поставиили унарный плюч прерд ней
    money = +prompt('Ваш бюджет на месяц? (Пример: 5000)', '');

    // проверка money
    while( isNaN(money) || money == '' || money == null) 
    {
        money = +prompt('Ваш бюджет на месяц? (Пример: 5000)', '');
    }
    // запись в бюджет
    appData.budget = money;
    // запись времени
    appData.time = time;
    // вывод дохода пользователю
    arrayClassResultTable[1].textContent = money.toFixed();
    // выводим год пользователю
    arrayClassTimeData[0].value = new Date(Date.parse(time)).getFullYear();
    // выводим месяц, getMonth() + 1 так как месяцыс нуля начинаються
    arrayClassTimeData[1].value = new Date(Date.parse(time)).getMonth() + 1;
    // выводим день
    arrayClassTimeData[2].value = new Date(Date.parse(time)).getDate();
    // делаем остальные кнопки активными
    for(let i = 0; i < (tagsButtons.length - 1); i++)
    {
        tagsButtons[i].removeAttribute('disabled', 'disabled');
    }
});


// При нажатии увердить обязательные расходы
expensesItemBtnApprove.addEventListener('click', function() {
    let sum = 0;

    // вопросы по 2 раза пользователю, через цикл
    for( let i = 0; i < arrayClassExpensesItem.length; i++ ) 
    {
        // получаем с полей инпут
        let question1One = arrayClassExpensesItem[i].value,
            question2One = arrayClassExpensesItem[++i].value;
        
        if( (typeof(question1One)) === 'string' && (typeof(question1One)) != null && (typeof(question2One)) != null 
        && question1One !== '' && question2One !== '' )
        {
            // запись ответа пользвователя в объект
            appData.expenses[question1One] = question2One;
            // запись суммы в обьекст, с унарным плюсом чтоб был тип данных число
            sum += +question2One;
        }
        else 
        {
            i--;
        }
    }
    // вывожу сумму обязательных расходов
    arrayClassResultTable[7].textContent = sum;
});

// Утвердить необязательные расходы
optionalExpensesBtnApprove.addEventListener('click', function() {
    // цикл
    for( let i = 0; i < arrayClassOptionalexpensesItem.length; i++ )
    {
        // спрашиваем у пользователя
        let chooseOptExpenses = arrayClassOptionalexpensesItem[i].value;
        // проверяем на не пустую и не null
        if(chooseOptExpenses !='' && (typeof(chooseOptExpenses)) != null && (typeof(chooseOptExpenses)) == 'string')
        {
            // запись в объект
            appData.optionalExpenses[i] =  chooseOptExpenses;
            // выводим статьи необязательных рассходов
            arrayClassResultTable[9].textContent += appData.optionalExpenses[i] + ' ';
        }
        else{
            i--;
        }
    }
});
// расчет дневного бюджета
countBudgetBtnCalculate.addEventListener('click', function() {
    // проверяем запустил ли пользователь программу
    if(appData.budget != undefined)
    {
        // считаем сумму обязательных расходов
        let  sum = 0;
        for(let key in appData.expenses)
        {
            sum += +appData.expenses[key];
        }
        //расчет ежедневного бюджета c округлением до целого числа
        appData.moneyPerDay = ((appData.budget - sum)/ 30).toFixed(1);
        // выводим бюджет на 1 день
        arrayClassResultTable[3].textContent = appData.moneyPerDay;

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
        else
        {
            messageStat = 'Произошла ошибка';
        }
        // выводим уровень достатка
        arrayClassResultTable[5].textContent = messageStat;
    }
    else
    {
        arrayClassResultTable[3].textContent = "Произошла ошибка";
    }
});
// Статьи необязательных рассходов
chooseIncome.addEventListener('input', function() {
        
        let items = chooseIncome.value;
        if( (typeof(items)) != 'string' && items == null && items == '' )
        {
            items = chooseIncome.value;
        }
        else
        {
            // создаем массив с дополнительным доходом
            appData.income = items.split(",");
            // выводим пользователю
            arrayClassResultTable[11].textContent = chooseIncome.value;
        }
});

// если пользователь указал что есть накопления
accumulationCheckBox.addEventListener('click', function() {
    if(appData.saving == true)
    {
        appData.saving = false;
    }
    else
    {
        appData.saving = true;
    }
});

// обработка если пользователь указывает сумму накопления
sumInput.addEventListener('input', function() {
    if(appData.saving == true)
    {
        // получаем значения из полей
        let sum = +sumInput.value,
            percent = +percentInput.value;
        // расчитываем доход с депозита в месяц и записываем в объект
        appData.mothIncome = sum/100/12*percent;
        // расчитываем доход с депозита в год и записываем в объект
        appData.yearIncome = sum/100*percent;

        // выводим накомпления на 1  месяц
        arrayClassResultTable[13].textContent = appData.mothIncome.toFixed(1);
        // выводим накопления за 1 год
        arrayClassResultTable[15].textContent = appData.yearIncome.toFixed(1);
    }
});

// обработка если пользователь указывает % накопления
percentInput.addEventListener('input', function() {
    if(appData.saving == true)
    {
        // получаем значения из полей
        let sum = +sumInput.value,
            percent = +percentInput.value;
        // расчитываем доход с депозита в месяц и записываем в объект
        appData.mothIncome = sum/100/12*percent;
        // расчитываем доход с депозита в год и записываем в объект
        appData.yearIncome = sum/100*percent;

        // выводим накомпления на 1  месяц
        arrayClassResultTable[13].textContent = appData.mothIncome.toFixed(1);
        // выводим накопления за 1 год
        arrayClassResultTable[15].textContent = appData.yearIncome.toFixed(1);
    }
});
// объект с данными от пользователя
let appData = {
    budget: money,
    time: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false
};

for(let key in appData)
{
    console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}