export const getRiskStyles = (riskLevel) => {
  const styles = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  };

  return styles[riskLevel] || styles.Low;
};

export const getRiskBadgeClasses = getRiskStyles;

export const getRiskClasses = getRiskStyles;

export const getRiskColor = (riskLevel) => {
  const colors = {
    High: "#dc2626",
    Medium: "#d97706",
    Low: "#16a34a",
  };

  return colors[riskLevel] || colors.Low;
};

export const riskBarColor = getRiskColor;

export const riskDotClass = (riskLevel) => {
  const classes = {
    High: "bg-red-500",
    Medium: "bg-amber-500",
    Low: "bg-green-500",
  };

  return classes[riskLevel] || classes.Low;
};

export const getRiskLevelFromScore = (score) => {
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
};

export const formatScore = (score) => Math.round(score);

export const averageScore = (employees) => {
  if (!employees.length) return 0;
  const total = employees.reduce((sum, employee) => sum + employee.burnout.score, 0);
  return Math.round(total / employees.length);
};

export const groupByDepartment = (employees) =>
  employees.reduce((departments, employee) => {
    if (!departments[employee.department]) {
      departments[employee.department] = [];
    }
    departments[employee.department].push(employee);
    return departments;
  }, {});
