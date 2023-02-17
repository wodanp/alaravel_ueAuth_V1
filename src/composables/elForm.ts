import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

export const useElForm = (
    fields: FormRules,
    defaultValues: { [key: string]: any } = []
) => {
    
    const formRef = ref<FormInstance>();
    
    const formModel = reactive<any>(
        Object.keys(fields).reduce((accumulator: any, current: string) => {
            if (defaultValues[current]) {
                accumulator[current] = defaultValues[current];
            } else {
                switch (fields[current][0]?.type) {
                    case "array":
                        accumulator[current] = [];
                        break;
                    case "boolean":
                        accumulator[current] = false;
                        break;
                    default:
                        accumulator[current] = "";
                }
            }

            return accumulator;
        }, {})
    );

    const formRules = reactive<FormRules>(fields);

    const validateForm = async (callbackIfValid: Function) => {
        if (!formRef.value) return;
        await formRef.value.validate((valid, fields) => {
            if (valid) {
                callbackIfValid()
            } else {
                console.log("composables.elForm:validateForm error", fields);
            }
        });
    };

    const resetForm = () => {
        if (!formRef.value) return;
        formRef.value.resetFields();
    };

    return {
        formRef,
        formModel,
        formRules,
        validateForm,
        resetForm,
    };
};
