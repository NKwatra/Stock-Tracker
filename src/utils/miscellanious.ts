import { message } from 'antd';

const ID = "snackbar"


export const showMessage = (content: string) => {
    message.loading({content, key: ID, duration: 0, className: "message"})
}

export const hideMessage = (success: boolean, content: string) => {
    if(success)
    {
        message.success({content, key: ID, duration: 2, className: "message"})
    }else
    {
        message.error({content, key: ID, duration: 2, className: "message"})
    }
}