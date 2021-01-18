import React from 'react';
import { MainContainer } from "./MainContainer";
import {Link} from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { useData } from "./../DataContext";
import { InsertDriveFile } from '@material-ui/icons';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { PrimaryButton } from "./PrimaryButton";
import Button from "@material-ui/core/Button";
export const Result = () => {

	const {data} = useData();
	const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
	const {files} = data;

	const onSubmit = () => {
		const formData = new FormData();
		
		if(data.files){
			data.files.forEach(file => {
				formData.append('files',file,file.name);
			})
		}

		entries.forEach(entry => {
			formData.append(entry[0],entry[1])
		});
		console.log(data);
		console.log('formData: ',formData);
	}
	
	return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                Все данные
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell align="right">value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry[0]}>
                                <TableCell>{entry[0]}</TableCell>
                                <TableCell align="right">
                                    {entry[1].toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {files && (
                <>
                    <Typography component="h2" variant="h5">
                        Файлы
                    </Typography>
                    <List>
                        {files.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile />
                                </ListItemIcon>
                                <ListItemText
                                    primary={f.name}
                                    secondary={f.size}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <Button
                fullWidth
                onClick={onSubmit}
                variant="contained"
                color="primary"
            >
                Отправить
            </Button>
            <Link to="/">Start over</Link>
        </MainContainer>
    );
}