function validateForm() {
  const form = document.forms[0];
  const r = parseFloat(form["r"].value);
  const x = parseFloat(form["x"].value);
  const y = parseFloat(form["y"].value);

  if (Number.isNaN(r) || Number.isNaN(x) || Number.isNaN(y) || r <= 0) {
    alert("Please enter valid values.");
    return false;
  }

  return true;
}
