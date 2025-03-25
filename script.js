document.addEventListener("DOMContentLoaded", function () {
    // Get global setting elements
    const yearPeriod = document.getElementById("yearPeriod");
    const yearLabel = document.getElementById("yearLabel");
    const investmentToggle = document.getElementById("investmentToggle");
    
    // Get all input elements
    const newCarPrice = document.getElementById("newCarPrice");
    const carValueAfterPeriod = document.getElementById("carValueAfterPeriod");
    const loanPercentage = document.getElementById("loanPercentage");
    const investmentPercentage = document.getElementById("investmentPercentage");
    const yearlyTest = document.getElementById("yearlyTest");
    const yearlyCare = document.getElementById("yearlyCare");
    const yearlyInsurance = document.getElementById("yearlyInsurance");
    const advancePayment = document.getElementById("advancePayment");
    const leasingMonthly = document.getElementById("leasingMonthly");
  
    // Get result elements
    const purchaseAmount = document.getElementById("purchaseAmount");
    const leasingAmount = document.getElementById("leasingAmount");
    const differenceAmount = document.getElementById("differenceAmount");
    const winner = document.getElementById("winner");
  
    // Get detailed breakdown elements
    const depreciationValue = document.getElementById("depreciationValue");
    const loanValue = document.getElementById("loanValue");
    const investmentValue = document.getElementById("investmentValue");
    const testValue = document.getElementById("testValue");
    const careValue = document.getElementById("careValue");
    const insuranceValue = document.getElementById("insuranceValue");
    const leasingBaseValue = document.getElementById("leasingBaseValue");
    const advanceValue = document.getElementById("advanceValue");
  
    // Get finance option elements
    const loanOption = document.querySelector(".loan-option");
    const investmentOption = document.querySelector(".investment-option");
    const loanItem = document.querySelector(".loan-item");
    const investmentItem = document.querySelector(".investment-item");
  
    // Toggle details
    const toggleDetails = document.getElementById("toggleDetails");
    const detailedBreakdown = document.getElementById("detailedBreakdown");
  
    toggleDetails.addEventListener("click", function () {
      detailedBreakdown.classList.toggle("active");
      toggleDetails.classList.toggle("active");
    });
    
    // Handle investment/loan toggle
    investmentToggle.addEventListener("change", function() {
      if (this.checked) {
        // Investment mode
        loanOption.classList.remove("active");
        investmentOption.classList.add("active");
        loanItem.classList.remove("active");
        investmentItem.classList.add("active");
      } else {
        // Loan mode
        loanOption.classList.add("active");
        investmentOption.classList.remove("active");
        loanItem.classList.add("active");
        investmentItem.classList.remove("active");
      }
      calculateResults();
    });
    
    // Update year label when period changes
    yearPeriod.addEventListener("input", function() {
      yearLabel.textContent = this.value;
      calculateResults();
    });
  
    // Add event listeners to all inputs
    const allInputs = document.querySelectorAll("input[type='number']");
    allInputs.forEach((input) => {
      input.addEventListener("input", calculateResults);
    });
    
    // Initialize UI state
    function initUI() {
      yearLabel.textContent = yearPeriod.value;
      loanOption.classList.add("active");
      loanItem.classList.add("active");
    }
    
    // Amortization calculation function
    function calculateLoanPayment(amountBorrowed, annualInterestRate, years) {
      const monthlyRate = annualInterestRate / 100 / 12;
      if (monthlyRate === 0) return amountBorrowed / (years * 12);
      
      return (amountBorrowed * monthlyRate * Math.pow(1 + monthlyRate, years * 12)) / 
             (Math.pow(1 + monthlyRate, years * 12) - 1);
    }
    
    // Calculate opportunity cost of investing the money
    function calculateInvestmentOpportunityCost(amount, annualReturnRate, years) {
      console.log(`calculating for amount: ${amount} return rate: ${annualReturnRate} years: ${years}`);
      //var res = amount / ((Math.pow(1 + monthlyRate, years * 12) - 1) / monthlyRate);
      //console.log(`${res}`);
      //const monthlyRate = annualReturnRate / 100 / 12;
      //if (monthlyRate === 0) return 0;
      // 485000 * 0.04 / 12
      console.log(amount*(annualReturnRate/100))
      console.log();
      return amount * (annualReturnRate/100) / 12;
    }
  
    // Calculate and display results
    function calculateResults() {
      const years = parseInt(yearPeriod.value);
      const months = years * 12;
      
      // Purchase calculation
      const carPriceValue = parseFloat(newCarPrice.value);
      const carValueAfterYears = parseFloat(carValueAfterPeriod.value);
      const depreciation = carPriceValue - carValueAfterYears;
  
      let financeCost = 0;
      
      if (investmentToggle.checked) {
        // Investment mode - opportunity cost
        const investRate = parseFloat(investmentPercentage.value);
        financeCost = calculateInvestmentOpportunityCost(depreciation, investRate, years);
        console.log(financeCost);
      } else {
        // Loan mode
        const loanRate = parseFloat(loanPercentage.value);
        financeCost = calculateLoanPayment(depreciation, loanRate, years);
      }
  
      const monthlyTestCost = parseFloat(yearlyTest.value) / 12;
      const monthlyCareCost = parseFloat(yearlyCare.value) / 12;
      const monthlyInsuranceCost = parseFloat(yearlyInsurance.value) / 12;
  
      const totalMonthlyPurchase =
        financeCost + monthlyTestCost + monthlyCareCost + monthlyInsuranceCost;
  
      // Leasing calculation
      const advancePaymentValue = parseFloat(advancePayment.value);
      const monthlyLeasePayment = parseFloat(leasingMonthly.value);
      const monthlyAdvancePortion = advancePaymentValue / months;
      
      const totalMonthlyLease = monthlyLeasePayment + monthlyAdvancePortion;
  
      // Calculate difference
      const difference = totalMonthlyLease - totalMonthlyPurchase;
  
      // Update UI
      purchaseAmount.textContent = Math.round(totalMonthlyPurchase).toLocaleString();
      leasingAmount.textContent = Math.round(totalMonthlyLease).toLocaleString();
      differenceAmount.textContent = Math.abs(Math.round(difference)).toLocaleString();
  
      if (difference > 0) {
        winner.textContent = "Purchase is cheaper";
        winner.style.backgroundColor = "#3498db33";
        winner.style.color = "#3498db";
      } else if (difference < 0) {
        winner.textContent = "Leasing is cheaper";
        winner.style.backgroundColor = "#2ecc7133";
        winner.style.color = "#2ecc71";
      } else {
        winner.textContent = "Equal cost";
        winner.style.backgroundColor = "#95a5a633";
        winner.style.color = "#95a5a6";
      }
  
      // Update detailed breakdown
      depreciationValue.textContent = Math.round(depreciation).toLocaleString();
      loanValue.textContent = Math.round(financeCost).toLocaleString();
      investmentValue.textContent = Math.round(financeCost).toLocaleString();
      testValue.textContent = Math.round(monthlyTestCost).toLocaleString();
      careValue.textContent = Math.round(monthlyCareCost).toLocaleString();
      insuranceValue.textContent = Math.round(monthlyInsuranceCost).toLocaleString();
      
      leasingBaseValue.textContent = Math.round(monthlyLeasePayment).toLocaleString();
      advanceValue.textContent = Math.round(monthlyAdvancePortion).toLocaleString();
    }
  
    // Initialize UI and calculate initial results
    initUI();
    calculateResults();
  });
  