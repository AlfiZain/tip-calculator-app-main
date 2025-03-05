document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".button-tip");
  const customTipButton = document.querySelector(".button-tip--custom");
  const tipAmountDisplay = document.getElementById("tip-amount-display");
  const totalDisplay = document.getElementById("total-display");
  const resetButton = document.getElementById("button-reset");
  const billErrorText = document.getElementById("bill-error-text");
  const tipErrorText = document.getElementById("tip-error-text");
  const peopleErrorText = document.getElementById("people-error-text");

  let billValue = 0;
  let peopleCount = 0;
  let tipPercent = 0;

  const validations = {
    bill: (value) => value > 0,
    tip: (value) => value >= 0,
    people: (value) => value > 0,
  };

  const dataIsValid = (key, value, validations) => {
    if (!validations[key]) return true;
    return validations[key](value);
  };

  const calculateTip = () => {
    if (billValue > 0 && tipPercent >= 0 && peopleCount > 0) {
      let tipAmount = (billValue * (tipPercent / 100)) / peopleCount;
      let totalAmount = billValue / peopleCount + tipAmount;

      tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
      totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }
  };

  const handleBillInput = (e) => {
    billValue = parseFloat(e.target.value) || 0;
    if (!dataIsValid("bill", billValue, validations)) {
      return (billErrorText.textContent = "Can't be zero");
    }
    billErrorText.textContent = "";
    calculateTip();
  };

  const handlePeopleInput = (e) => {
    peopleCount = parseInt(e.target.value) || 0;
    if (!dataIsValid("people", peopleCount, validations)) {
      return (peopleErrorText.textContent = "Can't be zero");
    }
    peopleErrorText.textContent = "";
    calculateTip();
  };

  const handleClickTipButton = (e) => {
    tipButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");
    tipPercent = parseFloat(e.target.textContent) || 0;
    if (!dataIsValid("tip", tipPercent, validations)) {
      return (tipErrorText.textContent = "Invalid input");
    }
    tipErrorText.textContent = "";
    calculateTip();
  };

  const handleInputCustomTipButton = (e) => {
    tipPercent = parseFloat(e.target.value) || 0;
    if (!dataIsValid("tip", tipPercent, validations)) {
      return (tipErrorText.textContent = "Invalid input");
    }
    tipErrorText.textContent = "";
    calculateTip();
  };

  const handleResetButton = () => {
    billValue = 0;
    peopleCount = 0;
    tipPercent = 0;
    billInput.value = "";
    peopleInput.value = "";
    customTipButton.value = "";
    tipButtons.forEach((button) => button.classList.remove("active"));
    billErrorText.textContent = "";
    tipErrorText.textContent = "";
    peopleErrorText.textContent = "";
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
  };

  billInput.addEventListener("input", handleBillInput);
  peopleInput.addEventListener("input", handlePeopleInput);
  tipButtons.forEach((button) => button.addEventListener("click", handleClickTipButton));
  customTipButton.addEventListener("input", handleInputCustomTipButton);
  resetButton.addEventListener("click", handleResetButton);
});
