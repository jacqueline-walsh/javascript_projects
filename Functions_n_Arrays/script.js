const companies = [
    {name: "Company One", category: "Finance", start: 1981, end: 2003},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2001, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989},
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// for (let i = 0; i < companies.length; i++) {
//     console.log(companies[i]);
// }

// FOREACH
// companies.forEach((company) => {
//     console.log(company.name);
// });

// FILTER
// let canDrink = []
// for (let i = 0; i < ages.length; i++) {
//     if (ages[i] >= 21) {
//         canDrink.push(ages[i]);
//     }
// } 

// const canDrink = ages.filter((age) => age >= 21);

// console.log(...canDrink.sort());


// FILTER COMPANIES WHICH ARE RETAIL (ES6)
// const retail = companies.filter(company => company.category === 'Retail');

// get 80's companies
// const eightiesCompanies = companies.filter(company => company.start >= 1980 && company.start <= 1989)

// Companies that lasted more than 10 years
// const lastedTenYears = companies.filter(company => (company.end - company.start >= 10));

// console.log(...lastedTenYears);

// MAP

// // Create an array of company names
// const companyNamesDates = companies.map(company => `${company.name}: [${company.start} - ${company.end}]\n`);

//  console.log(...companyNamesDates);

// sqrt of ages
// const sqRoot = ages
//     .map(age => Math.sqrt(age))
//     .map(age => age * 2);

// console.log(sqRoot);

// SORT

// const sortCompanies = companies.sort((c1, c2) => {
//     if (c1.start > c2.start) {
//         return 1;
//     } else { 
//         return -1;
//     }
// });

// const sortCompanies = companies.sort((a, b) => a - b);

// console.log(...sortCompanies);

// sort by age
// const sortAges = ages.sort((a, b) => b - a);

// console.log(sortAges);

// REDUCE

// Add all ages together
// let totalAges = 0;

// for (let i = 0; i < ages.length; i++) {
//     totalAges += ages[i];
// }

// const totalAges = ages.reduce((total, age) => total + age,0);

// Total years for all companies

// const totalYears = companies.reduce((total, company) => total + (company.end - company.start), 0);

// console.log(totalYears);

// COMBINE METHODS
const combined = ages
    .map(age => age * 2)
    .filter(age => age >= 40)
    .sort((a, b) => a - b)
    .reduce((total, age) => total + age, 0);

console.log(combined);