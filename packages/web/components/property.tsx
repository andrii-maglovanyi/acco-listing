import { useState } from "react";
import styled from "styled-components";

import { Property as PropertyModel } from "@acco-listing/server/src/properties/property.model";

import { maybePluralize, textTruncate } from "../utils/text-transform";

interface Props extends PropertyModel {
  onChangeStatus: (expired: boolean) => void;
}

const Wrapper = styled.section`
  border-radius: 4px;
  display: flex;
  margin-bottom: 1rem;
  overflow: hidden;

  .expired {
    opacity: 0.5;

    img {
      cursor: default;
    }

    &::after {
      background: white;
      content: "expired";
      font-size: 1.5rem;
      left: 64%;
      padding: 0.5rem 2.2rem;
      position: absolute;
      text-transform: uppercase;
      top: 74%;
      transform: rotate(-45deg);
    }
  }
`;

const Address = styled.div`
  font-size: 0.8rem;
  color: var(--dark-gray-color);
`;

const ImageContainer = styled.div`
  cursor: pointer;
  flex: 1 1 350px;
  position: relative;
  height: 250px;
  width: 350px;
  overflow: hidden;

  img {
    position: absolute;
    height: auto;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.1);
    animation: imageLoad ease 0.3s;
  }
`;

const Details = styled.div`
  border: 1px solid var(--gray-color);
  border-left: none;
  border-radius-bottom-right: 4px;
  border-radius-top-right: 4px;
  box-sizing: border-box;
  flex: 1 1 450px;
  flex-direction: column;
  padding: 1rem;
  position: relative;
`;

const Price = styled.div`
  color: var(--purple-color);
  font-weight: bold;

  .guide-price {
    font-size: 0.8rem;
  }

  .price {
    font-size: 1.6rem;
    margin: 0.2rem 0 1rem 0;
  }
`;

const StatusButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const Property: React.FC<Props> = (props) => {
  const {
    images,
    bedrooms,
    bathrooms,
    address,
    postcode,
    description,
    price,
    expired,
  } = props;

  const [imageNum, setImageNum] = useState(0);

  const nextImage = (): void => {
    if (!expired) {
      setImageNum(images.length - 1 > imageNum ? imageNum + 1 : 0);
    }
  };

  return (
    <Wrapper data-testid="property">
      <ImageContainer
        onClick={nextImage}
        className={expired ? "expired" : "active"}
      >
        <img
          alt={`${maybePluralize(
            bedrooms,
            "bedroom"
          )} house for sale in ${address}, ${postcode}`}
          src={`/images/${images[imageNum]}`}
        />
      </ImageContainer>
      <Details>
        <Price>
          <div className="guide-price">Guide price</div>
          <p className="price">&pound;{price}</p>
        </Price>
        <p>
          <span className="icon icon-bedroom"></span> {bedrooms}{" "}
          <span className="icon icon-bathroom"></span> {bathrooms}
        </p>
        <div>
          <strong>{maybePluralize(bedrooms, "bed")} house for sale</strong>
        </div>
        <Address>
          {address}, {postcode}
        </Address>
        <p>{textTruncate(description)}</p>
        <StatusButton
          onClick={(): void => props.onChangeStatus(expired)}
          onKeyPress={(): void => props.onChangeStatus(expired)}
          tabIndex={-1}
        >
          {expired ? "Expired" : "Active"}
        </StatusButton>
      </Details>
    </Wrapper>
  );
};
