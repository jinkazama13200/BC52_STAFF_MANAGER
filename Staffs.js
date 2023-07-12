// constructor of Staff
function Staff(id, name, email, password, date, salary, rank, time) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.rank = rank;
  this.time = time;
}

// calcSalary for Staff
Staff.prototype.calcSalary = function () {
  let salary = this.salary;
  if ("Giám Đốc" === this.rank) {
    return salary * 3;
  }
  if ("Trưởng Phòng" === this.rank) {
    return salary * 2;
  }
  return salary;
};

// calcWorkingTime for Staff
Staff.prototype.calcTotalTime = function () {
  let totalTime = this.time;
  if (totalTime >= 192) return "Xuất Sắc";
  if (totalTime >= 176) return "Giỏi";
  if (totalTime >= 160) return "Khá";
  return "Trung Bình";
};
