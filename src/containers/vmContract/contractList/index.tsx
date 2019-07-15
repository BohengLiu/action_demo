import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
// import Pagination from 'rc-pagination'
import React, { Fragment } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import {
  // NavLink,
  RouteComponentProps
  // Route,
  // Switch
} from 'react-router-dom'
import { withStyles, WithStyles } from '@material-ui/core/styles'

// components
import { I18nCollectionContract } from '@/i18n/i18n'
import VmContractStore from '@/stores/vmContract'
import WalletStore from '@/stores/wallet'

import ContractIcon from '@/images/contract.png'

import { StyleContractItem } from './list'
// import Operate from '@/containers/vmContract/operate'

import styles from './styles'

// const PER_PAGE = 10

interface WrapProps extends RouteComponentProps {
  vmContract?: VmContractStore
  wallet?: WalletStore
}

interface Props extends WithStyles<typeof styles>, WrapProps {
  labels: I18nCollectionContract['contract']
}

@inject('vmContract', 'wallet')
@observer
export class VmContractList extends React.Component<Props> {
  @observable
  currentContract: string = ''

  @action
  jumpToCall = (contractAddress: string, contractTxHash: string) => {
    const { vmContract, match, history } = this.props
    this.currentContract = contractAddress
    if (vmContract!.contract.has(contractAddress)) {
      history.push(`${match.url}/call/${contractAddress}`)
    } else {
      history.push(`${match.url}/call/${contractTxHash}`)
    }
  }

  @action
  jumpToCreate = () => {
    const { match, history } = this.props
    history.push(`${match.url}/create`)
    this.currentContract = ''
  }

  @action
  jumpToDetail = (contractAddress: string) => {
    const { match, history } = this.props
    history.push(`${match.url}/receipts/${contractAddress}`)
    this.currentContract = ''
  }

  render() {
    const { vmContract, classes, labels } = this.props
    const { contracts } = vmContract!
    const haveContract = contracts && contracts.length > 0
    // const basePath = match.url
    return (
      <Fragment>
        <div className={classes.title}>
          <span>{labels.contract}</span>
          {haveContract && <div className={classes.addCircle} onClick={this.jumpToCreate} />}
        </div>
        {!haveContract && (
          <div className={classes.noContract}>
            <img src={ContractIcon} alt="" />
            <span>{labels.nocontract}</span>
          </div>
        )}
        {haveContract && (
          <div className={classes.contractsList}>
            {contracts.map((contract, index) => {
              return (
                <StyleContractItem
                  jumpToCall={this.jumpToCall}
                  jumpToDetail={this.jumpToDetail}
                  labels={labels}
                  contract={contract}
                  key={index}
                  ifCurrent={this.currentContract === contract.contractAddress}
                />
              )
            })}
          </div>
        )}
      </Fragment>
    )
  }
}

export const StyleCreatedContract = withStyles(styles)(VmContractList)

const CreatedContractWrap = (props: WrapProps & WithTranslation) => {
  const { t, ...other } = props
  return <StyleCreatedContract {...other} labels={t('contract:contract')} />
}

export default withTranslation()(CreatedContractWrap)
