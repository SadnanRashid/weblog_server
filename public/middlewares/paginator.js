"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const paginator = (query) => {
    const { page, limit } = query;
    const pageN = parseInt(page);
    const limitN = parseInt(limit);
    return { page: pageN, limit: limitN, skip: limitN * pageN };
};
exports.paginator = paginator;
