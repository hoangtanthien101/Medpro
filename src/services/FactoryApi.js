import ApiConstants from "../adapter/ApiConstants";
import ApiOperation from "../adapter/ApiOperation";

const Factories = {
  getBranchList: async (keyword, id, KeywordDP, doctorId) => {
    let params = {};
    if (keyword) {
      params.keyword = keyword
    }
    if (id) {
      params.id = id
    }
    if (KeywordDP) {
      params.KeywordDP = KeywordDP
    }
    if (doctorId) {
      params.DoctorId = doctorId
    }
    return ApiOperation.request({
      url: `${ApiConstants.BRANCH}`,
      method: "GET",
      params: params
    });
  },
  getBranchListForDoctor: async (id) => {
    let params = {};
    if (id) {
      params.doctorId = id
    }
    return ApiOperation.request({
      url: `${ApiConstants.BRANCH_DOCTOR}`,
      method: "GET",
      params: params
    });
  },
  getSchedule: async (data) => {
    let params = {}
    if (data?.doctorId) {
      params.doctorId = data.doctorId
    }
    if (data?.branchId) {
      params.branchId = data.branchId
    }
    if (data?.service) {
      params.service = data.service
    }
    if (data?.department) {
      params.department = data.department
    }
    if (data?.dateStart) {
      params.dateStart = data.dateStart
    }
    if (data?.status) {
      params.status = data.status
    }
    return ApiOperation.request({
      url: `${ApiConstants.SCHEDULE}`,
      method: "GET",
      params: params
    });
  },
  getDepartmentList: async (id) => {
    let params = {}
    if (id) {
      params.branch = id
    }
    return ApiOperation.request({
      url: `${ApiConstants.DEPARTMENT}`,
      method: "GET",
      params: params
    });
  },
  getDepartmentListForDoctor: async (doctorId, branchId) => {
    return ApiOperation.request({
      url: `${ApiConstants.DEPARTMENT_DOCTOR}`,
      method: "GET",
      params: {
        doctorId: doctorId,
        branchId: branchId
      }
    });
  },
  createBranch: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.BRANCH,
      method: "POST",
      data: data,
    });
  },
  deleteBranch: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.BRANCH}/${data}`,
      method: "DELETE",
    });
  },
  createDepart: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.DEPARTMENT,
      method: "POST",
      data: data,
    });
  },
  updateBranch: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.BRANCH,
      method: "PUT",
      data: data,
    });
  },
  updateDepart: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.DEPARTMENT,
      method: "PUT",
      data: data,
    });
  },

  getAccountList: async (keyword, role = 2, branchId) => {
    let params = {};
    if (keyword) {
      params.keyword = keyword
    }
    if (branchId) {
      params.branchId = branchId
    }
    if (role) {
      params.role = role
    }
    return ApiOperation.request({
      url: `${ApiConstants.ACCOUNT}`,
      method: "GET",
      params: params
    });
  },
  updateAccountInfo: async (data, id) => {
    return ApiOperation.request({
      url: `${ApiConstants.ACCOUNT}/${id}`,
      method: "PUT",
      data: data,
    });
  },

  getListPatient: async (data) => {
    let params = {};
    if (data?.keyword) {
      params.keyword = data?.keyword
    }
    if (data?.userId) {
      params.userId = data?.userId
    }
    if (data?._id) {
      params._id = data?._id
    }
    return ApiOperation.request({
      url: ApiConstants.PATIENT,
      method: "GET",
      params: params
    });
  },

  // doctor
  createDoctor: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.DOCTOR,
      method: "POST",
      data: data,
    });
  },
  getDoctorInfo: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.ACCOUNT}/${data}`,
      method: "GET",
    });
  },

  createDoctorSchedule: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.SCHEDULE,
      method: "POST",
      data: data,
    });
  },
  updateDoctorSchedule: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.SCHEDULE,
      method: "PUT",
      data: data,
    });
  },

  createPatient: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.PATIENT,
      method: "POST",
      data: data,
    });
  },
  getPatientDetail: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.PATIENT}/${data}`,
      method: "GET",
    });
  },

  updatePatient: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.PATIENT,
      method: "PUT",
      data: data,
    });
  },
  deletePatient: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.PATIENT}/${data}`,
      method: "DELETE",
      data: data,
    });
  },
  deleteSchedule: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.SCHEDULE}/${data}`,
      method: "DELETE",
    });
  },
  updateSchedule: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.SCHEDULE}/${data}`,
      method: "PUT",
      data: data,
    });
  },

  // appointment
  createBooking: async (data) => {
    return ApiOperation.request({
      url: ApiConstants.BOOKING,
      method: "POST",
      data: data,
    });
  },
  detailAppointment: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING}/${data}`,
      method: "GET",
    });
  },
  getListDetailAppointment: async (data) => {
    let params = {}
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING}`,
      method: "GET",
      params: params,
    });
  },
  updateAppointment: async (data, status) => {
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING}/${data}`,
      method: "PUT",
      data: {
        status: status
      }
    });
  },
  deleteAppointment: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING}/${data}`,
      method: "DELETE",
    });
  },
  /// booking 
  getListBooking: async (data) => {
    let params = {};
    if (data?.Keyword) {
      params.Keyword = data.Keyword;
    }
    if (data?.UserId) {
      params.UserId = data.UserId;
    }
    if (data?.DoctorId) {
      params.DoctorId = data.DoctorId;
    }
    if (data?.dateCreate) {
      params.DateCreate = data?.dateCreate;
    }
    if (data?.dateBooking) {
      params.DateBooking = data?.dateBooking;
    }
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING}`,
      method: "GET",
      params: params
    });
  },
  updateBooking: async (id, data) => {
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING}/${id}`,
      method: "PUT",
      data: data
    });
  },
  createFeedBack: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.FEEDBACK}`,
      method: "POST",
      data: data
    });
  },
  getFeedBack: async (data) => {
    let params = {
      doctor_id: data
    }
    return ApiOperation.request({
      url: `${ApiConstants.FEEDBACK}`,
      method: "GET",
      params: params
    });
  },
  getQuestion: async (data) => {
    let params = {
    }
    if (data.user_id) {
      params.user_id = data.user_id
    }
    if (data.department_id) {
      params.department_id = data.department_id
    }
    if (data.doctor_id) {
      params.doctor_id = data.doctor_id
    }
    if (data.status) {
      params.status = data.status
    }
    return ApiOperation.request({
      url: `${ApiConstants.QUESTION}`,
      method: "GET",
      params: params
    });
  },
  createQuestion: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.QUESTION}`,
      method: "POST",
      data: data
    });
  },
  updateQuestion: async (data) => {
    return ApiOperation.request({
      url: `${ApiConstants.QUESTION}`,
      method: "PUT",
      data: data
    });
  },
  getBookingChart: async (year, month, Status) => {
    let params = {
    };
    if (year) {
      params.Year = year;
    }
    if (month) {
      params.Month = month;
    }
    if (Status) {
      params.Status = Status;
    }
    return ApiOperation.request({
      url: ApiConstants.BOOKING_CHART,
      method: "GET",
      params: params,
    });
  },
  getBookingTopDT: async (year, month, date) => {
    let params = {
    };
    if (year) {
      params.Year = year;
    }
    if (month) {
      params.Month = month;
    }
    if (date) {
      params.Date = date;
    }
    return ApiOperation.request({
      url: `${ApiConstants.BOOKING_TOP}`,
      method: "GET",
      params: params,
    });
  },
}

export default Factories;



