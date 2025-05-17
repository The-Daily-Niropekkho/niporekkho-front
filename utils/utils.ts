export default function rtrimSlash(str: any) {
    return str.replace(/\/+$/, ''); // Removes one or more trailing slashes
};