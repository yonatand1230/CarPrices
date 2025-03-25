# Car Prices Calculator

A sophisticated web application that helps users compare the financial implications of leasing a car versus purchasing and selling it after a specified period. This calculator features advanced financial modeling, responsive design, and progressive web app capabilities.

## Key Features

- **Financial Comparison**: Real-time calculations of monthly costs for both leasing and purchasing options
- **Amortization Algorithm**: Implements precise loan payment calculations using standard financial formulas
- **Advanced Financial Models**: Unique toggle to switch between loan interest and investment opportunity cost models
- **Flexible Time Period**: Adjustable time frame from 1-20 years with dynamic recalculation
- **Detailed Cost Breakdown**: Expandable section showing line-by-line cost analysis

## Technical Implementation 

### Financial Algorithms

The application implements key financial algorithms:

#### Loan Amortization Formula
```javascript
function calculateLoanPayment(amountBorrowed, annualInterestRate, years) {
  const monthlyRate = annualInterestRate / 100 / 12;
  if (monthlyRate === 0) return amountBorrowed / (years * 12);
  
  return (amountBorrowed * monthlyRate * Math.pow(1 + monthlyRate, years * 12)) / 
         (Math.pow(1 + monthlyRate, years * 12) - 1);
}
```

#### Investment Opportunity Cost Calculation
```javascript
function calculateInvestmentOpportunityCost(amount, annualReturnRate, years) {
  return amount * (annualReturnRate/100) / 12;
}
```

### UI/UX Implementation

- **Toggle Switch Component**: Custom-built toggle with animated transitions
- **Dynamic Form Labels**: Labels that update based on user input
- **Real-time Calculations**: Event listeners that trigger recalculations on any input change
- **Conditional Rendering**: Elements that show/hide based on selected financial model

### Mobile Optimization (PWA)

- **Service Worker**: Implements caching strategies for offline functionality
- **Web App Manifest**: Provides metadata for installable experience
- **Flexible Layouts**: Flexible layouts that adapt to screen size

## Future Plans

- Add multiple vehicle comparison capability
- Integrate with real-time interest rate and vehicle depreciation APIs
