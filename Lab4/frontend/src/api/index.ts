export type TableRow = {
    x: number,
    y: number,
    r: number
    hit: boolean,
    time: number
}

const HOST_URL = 'https://kxrxhlab4.fly.dev/';
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
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized!');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
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
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized!');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function loginToAccount(username: string, password: string): Promise<any> {
    const url = `${HOST_URL}/auth/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized!');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}


export async function registerNewAccount(username: string, password: string): Promise<any> {
    const url = `${HOST_URL}/auth/register`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized!');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function clearRecords(token: string, r: number): Promise<any> {
    const url = `${HOST_URL}/api/points?r=${r}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized!');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}