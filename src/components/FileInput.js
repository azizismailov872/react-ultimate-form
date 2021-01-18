import React from 'react';
import { Controller } from 'react-hook-form';
import Dropzone from "react-dropzone";
import {makeStyles} from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { CloudUpload, InsertDriveFile } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		background: '#eee',
		textAlign: 'center',
		cursor: 'pointer',
		color: '#333',
		padding: '10px',
		marginTop: '20px' 
	},
	icon: {
		marginTop: '16px',
		color: '#888',
		fontSize: '42px'
	}
}))

export const FileInput = ({control,name}) => {

	const styles = useStyles();

	return(
		<Controller
		control={control}
		name={name}
		defaultValue={[]}
		render={({onChange, onBlur, value}) => (
			<>
				<Dropzone onDrop={onChange}>
					{
						({getRootProps,getInputProps}) => (
							<Paper className={styles.root} variant="outlined" {...getRootProps()}>
								<CloudUpload className={styles.icon} />
								<input {...getInputProps()} name={name} onBlur={onBlur}  />
								<p>Drug and Drop file</p>
							</Paper>
						)
					}
				</Dropzone>
				<List>
					{
						value.map((f,index) => (
							<ListItem key={index}>
								<ListItemIcon>
									<InsertDriveFile />
								</ListItemIcon>
								<ListItemText primary={f.name} secondary={f.size} />
							</ListItem>
						))
					}
				</List>
			</>
		)}
		>
		</Controller>
	)
}