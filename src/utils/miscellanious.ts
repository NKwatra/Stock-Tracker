import { message } from 'antd';

const ID = "snackbar"

export const showMessage = (content: string) => {
    message.loading({content, key: ID, duration: 0, style: {
        zIndex: 1000
    }})
}

export const hideMessage = (success: boolean, content: string) => {
    if(success)
    {
        message.success({content, key: ID, duration: 2})
    }else
    {
        message.error({content, key: ID, duration: 2})
    }
}