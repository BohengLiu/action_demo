import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'

import i18n from '@/i18n/i18n'
import mockSwalFire from '@/tests/mocks/swal'
import getMockRouterProps from '@/tests/mocks/router'
import mockRootBuilder from '@/tests/mocks/store'
import { mockStyleClasses } from '@/tests/utils'

import { TransferToken } from './index'
import styles from './styles'
// import ContractModel from '@/models/contract'

describe('Containers: smartContract/operate/transfer', () => {
  const routerProps = getMockRouterProps<{ address: string }>({ address: 'test' })
  const mockRoot = mockRootBuilder()
  const mockContract = mockRoot.contract
  const mockWallet = mockRoot.wallet
  const classes = mockStyleClasses(styles)
  const labels = i18n['zh-CN'].contract.transfer

  const mockProps = {
    ...routerProps,
    contract: mockContract,
    wallet: mockWallet,
    labels,
    classes
  }

  let component: ShallowWrapper
  let instance: TransferToken

  beforeEach(() => {
    component = shallow(<TransferToken {...mockProps} />).dive()
    instance = component.instance() as TransferToken
    mockSwalFire.mockClear()
  })

  it('render', () => {
    expect(component.exists).toBeTruthy()
  })

  it('test toChange', () => {
    instance.toChange({ target: { value: 'newTo' } })
    expect(instance.to).toBe('newTo')
  })

  it('test amountChange', () => {
    instance.amountChange({ target: { value: 'newAmount' } })
    expect(instance.amount).toBe('newAmount')
  })

  it('verifyInputs insufficientFunds', () => {
    const data = instance.verifyInputs(12, '15', '0x', labels)
    expect(data).toBe(labels.swal.insufficientFunds)
  })

  it('verifyInputs invalidAddress', () => {
    const mockAddress = '0x0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37'
    const data = instance.verifyInputs(100, '10', mockAddress, labels)
    expect(data).toBe(labels.swal.invalidAddress)
  })

  it('handleConfirm error', () => {
    const mockPreventDefault = jest.fn()
    const mockEvent = {
      preventDefault: mockPreventDefault
    }
    const mockVerifyInputs = jest.spyOn(instance, 'verifyInputs')
    const mockHandleShowDialog = jest.spyOn(instance, 'handleShowDialog')
    routerProps.match.params.address = '0x00100e99f3acc2864f153b4977FF2575d362209661AC'
    instance.amountChange({ target: { value: '18' } })
    const event = { target: { value: '0x0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37' } } as React.ChangeEvent<
      HTMLInputElement
    >
    instance.toChange(event)
    instance.handleConfirm(mockEvent)
    expect(mockPreventDefault).toHaveBeenCalled()
    expect(mockVerifyInputs).toHaveBeenCalled()
    expect(mockHandleShowDialog).not.toHaveBeenCalled()
    expect(mockSwalFire).toHaveBeenCalled()
  })

  it('handleConfirm success', async () => {
    const mockPreventDefault = jest.fn()
    const mockEvent = {
      preventDefault: mockPreventDefault
    }
    const mockVerifyInputs = jest.spyOn(instance, 'verifyInputs')
    const mockHandleShowDialog = jest.spyOn(instance, 'handleShowDialog')
    await instance.handleConfirm(mockEvent)
    expect(mockPreventDefault).toHaveBeenCalled()
    expect(mockVerifyInputs).toHaveBeenCalled()
    expect(mockHandleShowDialog).toHaveBeenCalled()
  })

  it('handleConfirm failed', () => {
    const mockPreventDefault = jest.fn()
    const mockEvent = {
      preventDefault: mockPreventDefault
    }
    const mockVerifyInputs = jest.spyOn(instance, 'verifyInputs')
    const mockHandleShowDialog = jest.spyOn(instance, 'handleShowDialog')
    instance.toChange({ target: { value: '0x0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37' } })
    instance.handleConfirm(mockEvent)
    expect(mockPreventDefault).toHaveBeenCalled()
    expect(mockVerifyInputs).toHaveBeenCalled()
    expect(mockHandleShowDialog).not.toHaveBeenCalled()
    expect(mockSwalFire).toHaveBeenCalled()
  })

  it('dialogConfirm success', async () => {
    const mockCheckPassword = jest.fn(() => true)
    mockWallet.checkPassword = mockCheckPassword
    mockProps.match.params.address = '0x00100e99f3acc2864f153b4977FF2575d362209661AC'
    const mockTransferToken = jest
      .fn()
      .mockImplementation((address: string, to: string, amount: string) => ({ success: true }))
    mockContract.transferToken = mockTransferToken
    const mockOnClose = jest.spyOn(instance, 'onClose')
    await instance.dialogConfirm('password')
    expect(mockCheckPassword).toHaveBeenCalled()
    expect(mockTransferToken).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('dialogConfirm error transfer', async () => {
    const mockCheckPassword = jest.fn(() => true)
    mockWallet.checkPassword = mockCheckPassword
    mockProps.match.params.address = '0x00100e99f3acc2864f153b4977FF2575d362209661AC'

    const mockTransferToken = jest
      .fn()
      .mockImplementation((address: string, to: string, amount: string) => ({ success: false }))
    mockContract.transferToken = mockTransferToken

    const mockHandleCloseDialog = jest.spyOn(instance, 'handleCloseDialog')
    await instance.dialogConfirm('12345678')
    expect(mockCheckPassword).toHaveBeenCalled()
    expect(mockTransferToken).toHaveBeenCalled()
    expect(mockHandleCloseDialog).toHaveBeenCalled()
  })

  it('dialogConfirm error password', async () => {
    const mockCheckPassword = jest.fn().mockImplementation(() => false)
    mockWallet.checkPassword = mockCheckPassword
    instance.forceUpdate()
    await instance.dialogConfirm('password')
    // TODO:
    expect(mockSwalFire).toHaveBeenCalled()
  })

  it('handleCloseDialog', () => {
    instance.handleCloseDialog()
    expect(instance.showDialog).toBe(false)
  })

  it('handleShowDialog', () => {
    instance.handleShowDialog()
    expect(instance.showDialog).toBe(true)
  })

  it('close', () => {
    const mockHistoryPush = jest.fn()
    routerProps.history.push = mockHistoryPush
    instance.onClose()
    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
