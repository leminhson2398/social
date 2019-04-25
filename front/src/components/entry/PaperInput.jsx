import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { Divider } from '@material-ui/core'
import EmailOutlined from '@material-ui/icons/EmailOutlined'
import LockOpen from '@material-ui/icons/LockOpen'
import entryStyle from '../../static/style/entry'
import classNames from 'classnames'


export default withStyles(entryStyle)(
	// this takes in placeholder, aria and component as arguments
	class Entry extends React.Component {

		render() {
			let { classes, placeholder, component, aria } = this.props
			return (
				<Paper
					className={classNames(classes.inputContainer)}
					elevation={1}
				>
					<InputBase className={classes.input} placeholder={String(placeholder)} />
					<Divider className={classes.divider} />
					<IconButton className={classes.iconButton} aria-label={aria}>
						{String(component).toLowerCase() === 'email' ? <EmailOutlined /> : <LockOpen />}
					</IconButton>
				</Paper>
			)
		}
	}
)
