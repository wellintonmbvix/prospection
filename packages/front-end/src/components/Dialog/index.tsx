import * as React from 'react'
import { Button } from "../"
import Modal from '../Modal'
import { DialogProvider, useDialog } from './DialogContext';

export type DialogButton = 'ok' | 'ok-cancel';

export interface DialogProps {
    /**
     * Define se o dialog está aberto ou não.
     */
    open?: boolean
    /**
     * Título que será exibido no dialog
     */
    title: string
    /**
     * Menssagem que será exibido no dialog
     */
    message: string
    /**
     * Define quais botões serão exibidos no dialog
     */
    button?: DialogButton
    /**
     * Texto para substitui o texto default do botão ok
     */
    okText?: string
    /**
     * Método que será executado ao clicar no botão Ok do dialog
     */
    onOk?: () => void
    /**
     * Texto para substitui o texto default do botão Cancelar
     */
    cancelText?: string
    /**
     * Método que será executado ao clicar no botão Cancelar do dialog
     */
    onCancel?: () => void
    /**
     * Método que será executado no fechamento do dialog
     */
    onClose?: () => void
}

export default function Dialog({
    open,
    title,
    message,
    button = 'ok',
    okText,
    onOk,
    cancelText,
    onCancel,
    onClose
}:DialogProps) {
    function actions() {
        if(button === "ok-cancel"){
            return <Button onClick={onOk && onOk}>{okText || "Ok"}</Button>
        }

        return [
            <Button key="sim" color="primary" onClick={onOk && onOk}>{okText || "Ok"}</Button>,
            <Button key="nao" color="danger" onClick={onCancel && onCancel}>{cancelText || "Cancelar"}</Button>
        ]
    }
  return (
    <Modal 
        open={open}
        title={title}
        message={message}
        actionsPosition="right"
        actions={actions()}
        onClose={onClose && onClose}
    />
  )
}

Dialog.DialogProvider = DialogProvider
Dialog.useDialog = useDialog

export { DialogProvider, useDialog }
