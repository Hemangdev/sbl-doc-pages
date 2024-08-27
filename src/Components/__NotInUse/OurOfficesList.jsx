import { Col, ListGroup } from "react-bootstrap";

const OurOfficesList = () => {
  const OurOffices = [
    {
      id: 1,
      name: "Corporate Office",
    },
    {
      id: 2,
      name: "SLB Work Ghaziabad",
    },
    {
      id: 3,
      name: "SLB Work Jaipur",
    },
    {
      id: 4,
      name: "SLB Work Haridwar",
    },
    {
      id: 5,
      name: "SLB Work Unit 2 Haridwar",
    },
    {
      id: 6,
      name: "SLB Work Rangpo",
    },
    {
      id: 7,
      name: "SLB Work Ecommerce Delhi",
    },
  ];
  return (
    <Col md="3" className="bg_darkblue officeList pb-4 ">
      <div className="head">
        <h3> OUR OFFICES</h3>
        <hr className="hrline" />
      </div>

      <ListGroup>
        {OurOffices.map((item, key) => (
          <ListGroup.Item
            as="li"
            key={key}
            className="d-flex justify-content-between align-items-start active"
            variant="primary"
            action
          >
            {item.name}
            <i className="fa-solid fa-caret-right"></i>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default OurOfficesList;
