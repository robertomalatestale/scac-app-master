const DEFAULT_BASE_URL = 'http://localhost:8081/api/v1';

const resolveBaseUrl = (value) => {
	if (typeof value === 'string' && value.trim() !== '') {
		return value.replace(/\/$/, '');
	}

	return DEFAULT_BASE_URL;
};

export const BASE_URL = resolveBaseUrl(process.env.REACT_APP_BASE_URL);
export const BASE_URL2 = resolveBaseUrl(process.env.REACT_APP_BASE_URL2);
