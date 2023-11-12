const statusCode = {
	ERROR_401: (message) => {
		return {
			success: false,
			code: 401,
			message
		}
	},

	ERROR_403: (message) => {
		return {
			success: false,
			code: 403,
			message
		}
	},

	ERROR_404: (message) => {
		return {
			success: false,
			code: 404,
			message
		}
	},

	ERROR_412: (message) => {
		return {
			success: false,
			code: 412,
			message
		}
	},

	SUCCESS_200: (message, data, total, pageSize) => {
		return {
			success: true,
			message,
			data,
			total, 
			pageSize
		}
	},

	SUCCESS_ERROR_200: (message, data) => {
		return {
			success: false,
			message
		}
	},

	SUCCESS_200_ERROR: (message, data) => {
		console.log(message)
		return {
			success: false,
			code: 200,
			message,
			data,
		}
	}
}

module.exports = statusCode