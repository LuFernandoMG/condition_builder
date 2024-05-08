import { Rule } from "./interfaces";

export const getConditionalFilter = (rule: Rule, data: any) => {
    switch (rule.condition) {
        case 'equals':
            return (
                data[rule.column_name].toLowerCase() ===
                String(rule.value).toLowerCase()
            );
        case 'contain':
            return data[rule.column_name]
                .toLowerCase()
                .includes(String(rule.value).toLowerCase());
        case 'not contain':
            return !data[rule.column_name]
                .toLowerCase()
                .includes(String(rule.value).toLowerCase());
        case 'regex':
            try {
                const regex = new RegExp(String(rule.value));
                return regex.test(data[rule.column_name]);
            } catch (e) {
                console.error('e ', e);
                console.error('Regular expression wrongly defined');
                return false;
            }
        case 'less than':
            return Number(data[rule.column_name]) < Number(rule.value);
        case 'greater than':
            return Number(data[rule.column_name]) > Number(rule.value);
        default:
            return false;
    }
};