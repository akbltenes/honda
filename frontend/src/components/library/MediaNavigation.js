import React from 'react';
import { Nav } from 'react-bootstrap';

const MediaNavigation = ({ activeKey, onSelect }) => {
  return (
    <Nav variant="tabs" className="library-tabs">
      <Nav.Item>
        <Nav.Link eventKey="images">
          <i className="far fa-images"></i> Görseller
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="videos">
          <i className="far fa-play-circle"></i> Videolar
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="documents">
          <i className="far fa-file-alt"></i> Dokümanlar
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MediaNavigation; 