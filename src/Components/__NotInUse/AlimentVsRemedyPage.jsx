import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const AlimentVsRemedyPage = () => {
	return (
		<>
			<Container fluid className="pt-5 bgwhite">
				<Container className="">
					<Row className="d-flex justify-content-center text-center">
						<h3 className="bold themefont">
							Search Ailment Or Remedy By Entering Keywords Below
						</h3>
						<div className="w-60 p-4">
							<input type="text" className="form-control" placeholder="search..." />
						</div>
					</Row>
					<Table striped hover>
						<thead className="bgtheme ">
							<tr>
								<th width="300" className="p-3 left-border-white">
									Ailment
								</th>
								<th className="p-3 " colSpan={2}>
									Remedy
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="themeborder p-4">Mark</td>
								<td className="themeborder p-4">Mark</td>
								<td className="themeborder p-4">Mark</td>
							</tr>
						</tbody>
					</Table>


				</Container>
			</Container>
		</>
	);
};

export default AlimentVsRemedyPage;
