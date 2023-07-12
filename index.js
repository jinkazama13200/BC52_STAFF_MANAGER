// DOM function
function DomId(n) {
  return document.getElementById(n);
}

DomId("btnThem").onclick = function () {
  DomId("btnCapNhat").disabled = true;
};

let staffs = [];

let isSubmitted = false;
// add staff function

init();
// function init
function init() {
  staffs = JSON.parse(localStorage.getItem("staffs"));
  staffs = staffs.map((value) => {
    return new Staff(
      value.id,
      value.name,
      value.email,
      value.password,
      value.date,
      value.salary,
      value.rank,
      value.time
    );
  });

  display(staffs);
}
function addStaff() {
  isSubmitted = true;
  let staff = validate();
  if (!staff) {
    return;
  }
  //   push staff to staffs array
  staffs.push(staff);
  //Modal hide after added
  $("#myModal").modal("hide");
  // localstorage
  localStorage.setItem("staffs", JSON.stringify(staffs));
  // display for staff
  display(staffs);

  //   resetForm
  resetForm();
}

// resetForm
function resetForm() {
  isSubmitted = false;
  DomId("tknv").value = "";
  DomId("name").value = "";
  DomId("email").value = "";
  DomId("password").value = "";
  DomId("datepicker").value = "";
  DomId("luongCB").value = "";
  DomId("chucvu").value = "";
  DomId("gioLam").value = "";

  DomId("tbTKNV").innerHTML = "";
  DomId("tbTen").innerHTML = "";
  DomId("tbEmail").innerHTML = "";
  DomId("tbMatKhau").innerHTML = "";
  DomId("tbNgay").innerHTML = "";
  DomId("tbLuongCB").innerHTML = "";
  DomId("tbChucVu").innerHTML = "";
  DomId("tbGiolam").innerHTML = "";

  DomId("btnThemNV").disabled = false;
  DomId("tknv").disabled = false;
}

// display
function display(staffs) {
  let output = staffs.reduce((result, value, index) => {
    return (
      result +
      `<tr>
        <td>${value.id}</td>
        <td>${value.name}</td>
        <td>${value.email}</td>
        <td>${value.date}</td>
        <td>${value.rank}</td>
        <td>${value.calcSalary().toLocaleString()} VND</td>
        <td>${value.calcTotalTime()}</td>
        <td>${value.time} Giờ</td>
        <td><button class="btn btn-success" data-target="#myModal" data-toggle="modal" onclick="editStaff('${
          value.id
        }')">Chỉnh sửa</button></td>
        <td><button class="btn btn-warning" onclick="removeStaff('${
          value.id
        }')">Xóa</button></td>
        </tr>
        `
    );
  }, "");
  DomId("tableDanhSach").innerHTML = output;
}

//remove Staff function
function removeStaff(staffId) {
  staffs = staffs.filter((value) => {
    return value.id !== staffId;
  });
  // localstorage
  localStorage.setItem("staffs", JSON.stringify(staffs));

  display(staffs);
}

//edit Staff function
function editStaff(staffId) {
  let staff = staffs.find((value) => {
    return value.id === staffId;
  });
  DomId("tknv").value = staff.id;
  DomId("name").value = staff.name;
  DomId("email").value = staff.email;
  DomId("password").value = staff.password;
  DomId("datepicker").value = staff.date;
  DomId("luongCB").value = staff.salary;
  DomId("chucvu").value = staff.rank;
  DomId("gioLam").value = staff.time;

  DomId("btnCapNhat").disabled = false;
  DomId("btnThemNV").disabled = true;
  DomId("tknv").disabled = true;
}

//update Staff function
function updateStaff() {
  isSubmitted = true;
  let staff = validate();
  if (!staff) return;

  let update = staffs.findIndex((value) => {
    return value.id === staff.id;
  });
  staffs[update] = staff;
  // localstorage
  localStorage.setItem("staffs", JSON.stringify(staffs));
  //Modal hide after added
  $("#myModal").modal("hide");

  display(staffs);

  resetForm();
}

// search Staff depend on totalTime rank
function searchStaff() {
  // Dom
  let search = DomId("searchName").value;
  search = search.trim().toLowerCase();

  let newStaff = staffs.filter((value) => {
    let searchStaff = value
      .calcTotalTime()
      .trim()
      .toLowerCase()
      .includes(search);

    return searchStaff;
  });
  display(newStaff);
}

// checking empty array function

function isRequired(value) {
  // check chuỗi rỗng
  if (!value.trim()) {
    // thêm ! để xét điều kiện chuỗi rỗng về true
    return false;
  }
  return true;
}

// tạo hàm check có phải là số không
function isSalary(value) {
  // Nếu giá trị không phải là số thì trả về false
  if (isNaN(value)) {
    return false;
  }
  // Nếu giá trị là số mà không đúng điều kiện thì trả về false
  if (value < 1e6 || value > 2e7) {
    return false;
  }
  // Nếu giá trị là số và không đi vào điều kiện không hợp lệ thì sẽ trả giá trị về true
  return true;
}

// tạo hàm check có phải là số không cho giờ làm
function isTime(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}

// isId function (4 to 6 charaters(only number))
function isId(value) {
  let regex = /^\d{4,6}$/;
  return regex.test(value);
}

// isName function (no number)
function isName(value) {
  let regex =
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
  return regex.test(value);
}

// isEmail function
function isEmail(value) {
  let regex = /^\S+@\S+\.\S+$/;
  return regex.test(value);
}

//isPassword (atleast 1 digit number,1 special char,1 uppercase char,1 lowercase char,8-10 characters)
function isPassword(value) {
  let regex =
    /(?=^.{8,10}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return regex.test(value);
}

// validation function for staff
function validate() {
  // tạo cờ hiệu xét các input có phải chuỗi rỗng không
  let isValid = true;

  let id = DomId("tknv").value;
  let name = DomId("name").value;
  let email = DomId("email").value;
  let password = DomId("password").value;
  let date = DomId("datepicker").value;
  let salary = DomId("luongCB").value;
  let rank = DomId("chucvu").value;
  let time = DomId("gioLam").value;

  if (!isRequired(id)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbTKNV").innerHTML = "Tài khoản không được để trống";
    DomId("tbTKNV").style.display = "block";
  } else if (!isId(id)) {
    isValid = false;
    DomId("tbTKNV").innerHTML = "Tài khoản chỉ bao gồm 4 đến 6 ký tự (số)";
    DomId("tbTKNV").style.display = "block";
  }
  if (!isRequired(name)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbTen").innerHTML = "Họ tên không được để trống";
    DomId("tbTen").style.display = "block";
  } else if (!isName(name)) {
    isValid = false;
    DomId("tbTen").innerHTML = "Họ tên không hợp lệ";
    DomId("tbTen").style.display = "block";
  }

  if (!isRequired(email)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbEmail").innerHTML = "Email không được để trống";
    DomId("tbEmail").style.display = "block";
  } else if (!isEmail(email)) {
    DomId("tbEmail").innerHTML = "Email không hợp lệ";
    DomId("tbEmail").style.display = "block";
  }

  if (!isRequired(password)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
    DomId("tbMatKhau").style.display = "block";
  } else if (!isPassword(password)) {
    DomId("tbMatKhau").innerHTML =
      "Mật khẩu bao gồm 8 đến 10 ký tự(in hoa,ký tự đặc biệt,số)";
    DomId("tbMatKhau").style.display = "block";
  }

  if (!isRequired(date)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbNgay").innerHTML = "Ngày làm không được để trống";
    DomId("tbNgay").style.display = "block";
  }
  if (!isRequired(salary)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbLuongCB").innerHTML = "Tiền lương không được để trống";
    DomId("tbLuongCB").style.display = "block";
  } else if (!isSalary(+salary)) {
    isValid = false;
    DomId("tbLuongCB").innerHTML = "Lương cơ bản giới hạn từ 1 đến 20 triệu";
    DomId("tbLuongCB").style.display = "block";
  }

  if (!isRequired(rank)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbChucVu").innerHTML = "Chức vụ không được để trống";
    DomId("tbChucVu").style.display = "block";
  }
  if (!isRequired(time)) {
    isValid = false;
    // Thêm ! để xét điều kiện false,nếu false sẽ trả giá trị của isValid về false
    // Nếu false sẽ gán giá trị tb cho input
    DomId("tbGiolam").innerHTML = "Giờ làm không được để trống";
    DomId("tbGiolam").style.display = "block";
  } else if (!isTime(+time)) {
    isValid = false;
    DomId("tbGiolam").innerHTML = "Giờ làm giới hạn từ 80 đến 200 giờ";
    DomId("tbGiolam").style.display = "block";
  }

  if (isValid) {
    let staff = new Staff(
      id,
      name,
      email,
      password,
      date,
      +salary,
      rank,
      +time
    );
    return staff;
  }

  return undefined;
}

// onitput
DomId("tknv").oninput = (event) => {
  if (!isSubmitted) return;
  if (isRequired(event.target.value)) {
    DomId("tbTKNV").innerHTML = "";
  } else {
    DomId("tbTKNV").innerHTML = "Tài khoản không được để trống";
  }
};
DomId("name").oninput = (event) => {
  if (!isSubmitted) return;
  if (isRequired(event.target.value)) {
    DomId("tbTen").innerHTML = "";
  } else {
    DomId("tbTen").innerHTML = "Họ tên không được để trống";
  }
};
DomId("email").oninput = (event) => {
  if (!isSubmitted) return;
  if (isRequired(event.target.value)) {
    DomId("tbEmail").innerHTML = "";
  } else {
    DomId("tbEmail").innerHTML = "Email không được để trống";
  }
};
DomId("password").oninput = (event) => {
  if (!isSubmitted) return;

  if (isRequired(event.target.value)) {
    DomId("tbMatKhau").innerHTML = "";
  } else {
    DomId("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
  }
};
DomId("datepicker").oninput = (event) => {
  if (!isSubmitted) return;

  if (isRequired(event.target.value)) {
    DomId("tbNgay").innerHTML = "";
  } else {
    DomId("tbNgay").innerHTML = "Ngày làm không được để trống";
  }
};
DomId("luongCB").oninput = (event) => {
  if (!isSubmitted) return;

  if (isRequired(event.target.value)) {
    DomId("tbLuongCB").innerHTML = "";
  } else {
    DomId("tbLuongCB").innerHTML = "Tiền lương không được để trống";
  }
};
DomId("chucvu").oninput = (event) => {
  if (!isSubmitted) return;

  if (isRequired(event.target.value)) {
    DomId("tbChucVu").innerHTML = "";
  } else {
    DomId("tbChucVu").innerHTML = "Chức vụ không được để trống";
  }
};
DomId("gioLam").oninput = (event) => {
  if (!isSubmitted) return;

  if (isRequired(event.target.value)) {
    DomId("tbGiolam").innerHTML = "";
  } else {
    DomId("tbGiolam").innerHTML = "Giờ làm không được để trống";
  }
};
