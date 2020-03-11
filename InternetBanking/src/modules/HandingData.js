import * as helper from './Helper'
export function getHandingDataSelect2(data) {
    var ProcessedData = data.reduce(function (accumulator, currentValue) {
        return [
            ...accumulator,
            {
                'value': currentValue.id ? currentValue.id : '',
                'label': currentValue.name ? currentValue.name : ''
            }
        ];
    }, [])
    return ProcessedData;
}

export function getHandingDataSelect2OfCustomerStore(data) {
    var ProcessedData = data.reduce(function (accumulator, currentValue) {
        return [
            ...accumulator,
            {
                'value': currentValue.customer_store_number_payment ? currentValue.customer_store_number_payment : '',
                'label': currentValue.customer_store_name ? currentValue.customer_store_name : 'Không xác định',
                'customer_store_id': currentValue.customer_store_id ? currentValue.customer_store_id : ''
            }
        ];
    }, [])
    return ProcessedData;
}

export function getHandingDataTable(data) {
    var ProcessedData = data.reduce(function (accumulator, currentValue) {
        return [
            ...accumulator,
            {
                'class_id': currentValue.class_id ? currentValue.class_id : '',
                'student_id': currentValue.student ? currentValue.student_id : currentValue.id,
                'subject_id': currentValue.subject_id ? currentValue.subject_id : '',
                'student_name': currentValue.student ? currentValue.student.name : currentValue.name,
                'short_examination': currentValue.short_examination ? parseFloat(currentValue.short_examination) : '',
                '15_examination': currentValue["15_examination"] ? parseFloat(currentValue["15_examination"]) : '',
                '60_examination': currentValue["60_examination"] ? parseFloat(currentValue["60_examination"]) : '',
                'half_examination': currentValue.half_examination ? parseFloat(currentValue.half_examination) : '',
                'examination': currentValue.examination ? parseFloat(currentValue.examination) : '',
                'created_at': currentValue.created_at ? currentValue.created_at : '',
                'updated_at': currentValue.updated_at ? currentValue.updated_at : ''
            }
        ];
    }, [])
    return ProcessedData;
}