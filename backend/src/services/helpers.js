const slugify = require('slugify');
exports.makeSlug = (value) => slugify(value || '', { lower: true, strict: true, trim: true });
exports.pagination = (query) => { const limit = Number(query.limit ?? 12); const page = Math.max(1, Number(query.page ?? 1)); if ((!Number.isInteger(limit) || limit === 0 || limit < -1) || !Number.isInteger(page)) throw Object.assign(new Error('Parâmetros de paginação inválidos.'), { status: 400 }); return { limit, page, offset: limit === -1 ? 0 : (page - 1) * limit }; };
exports.selectedFields = (fields, allowed, defaults) => { if (!fields) return defaults; const list = fields.split(',').map(x => x.trim()).filter(x => allowed.includes(x)); return list.length ? list : defaults; };
