const validStatuses = ['PENDING', 'PREPARING', 'COMPLETED', 'DELIVERED', 'CANCELLED']

export function validateOrderPayload(payload: any): { valid: boolean; message?: string } {
    if (!payload || typeof payload !== 'object') return { valid: false, message: 'Invalid JSON' }

    const { email, table_num, status, items } = payload

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return { valid: false, message: 'A valid email is required' }
    }

    if (table_num !== null && table_num !== undefined && typeof table_num !== 'number') {
        return { valid: false, message: 'Table number must be a number or null' }
    }

    if (!status || typeof status !== 'string' || !validStatuses.includes(status)) {
        return { valid: false, message: `Status must be one of ${validStatuses.join(', ')}` }
    }

    if (!Array.isArray(items) || items.length === 0 || items.some(id => typeof id !== 'string')) {
        return { valid: false, message: 'Items must be a non-empty array of item IDs' }
    }

    return { valid: true }
}
