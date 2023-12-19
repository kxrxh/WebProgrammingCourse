import axios from 'axios';

export type TableRow = {
    x: number,
    y: number,
    r: number,
    hit: boolean,
    time: number
}

const HOST_URL = 'https://kxrxhlab4.fly.dev';
// const HOST_URL = 'http://localhost:8080';

/**
 * Fetches points data from the server using a token for
 * authentication and a radius value.
 *
 * @param {string} token - The authorization token.
 * @param {number} r - The radius to fetch points for.
 * @return {Promise<any>} A promise that resolves with the
 * points data.
 */
export async function fetchPointsWithToken(token: string, r: number): Promise<any> {
    const url = `${HOST_URL}/api/points?r=${r}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
}

/**
 * Asynchronously adds a point to the server using
 * the provided coordinates and radius.
 *
 * @param {string} token - The authorization token.
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {number} r - The radius to be used.
 * @return {Promise<any>} The response data as JSON.
 */
export async function addPoint(token: string, x: number, y: number, r: number): Promise<any> {
    const url = `${HOST_URL}/api/points?x=${x}&y=${y}&r=${r}`;

    try {
        const response = await axios.post(url, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
}

export async function loginToAccount(username: string, password: string): Promise<any> {
    const url = `${HOST_URL}/auth/login`;

    try {
        const response = await axios.post(url, {
            username: username,
            password: password
        });

        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
}

export async function registerNewAccount(username: string, password: string): Promise<any> {
    const url = `${HOST_URL}/auth/register`;

    try {
        const response = await axios.post(url, {
            username: username,
            password: password
        });

        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
}

export async function clearRecords(token: string, r: number): Promise<any> {
    const url = `${HOST_URL}/api/points?r=${r}`;

    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
}

function handleErrorResponse(error: any) {
    if (error.response && error.response.status === 401) {
        throw new Error('Unauthorized!');
    } else {
        throw new Error(`HTTP error! status: ${error.response ? error.response.status : 'unknown'}`);
    }
}
