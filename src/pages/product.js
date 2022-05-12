import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/context.js';
import { CATEGORY_TYPE } from '../constants/index.js';
import unbxdSearchConfig from '../unbxd-search.config.json';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const loadRecs = () => {
  var context = {
    widgets: {
      widget1: {
        name: 'recommendations1',
      },
      widget2: {
        name: 'recommendations',
      },
      widget3: {
        name: 'recommendations3',
      },
    },
    userInfo: {
      userId: 'uid-1652360362704-34764',
      siteKey: 'demo-unbxd700181503576558',
      apiKey: '19762cd9ce8ffcdb88fee1404e3fb802',
    },
    pageInfo: {
      pageType: 'PRODUCT',
      productIds: ['SVCV'],
    },
    unbxdDeviceType: {
      desktopBrowser: true,
      mobileBrowser: false,
    },
    itemClickHandler: function (product) {
      // product information will be provided here
      alert(JSON.stringify(product));
    },
    dataParser: function (templateData) {
      // modify the data received from recommendation API in case required.
      // console.log("template data");
      return templateData;
    },
  };
  window._unbxd_getRecommendations(context);
};

export default function Product(props) {
  const { state, dispatch } = useContext(AppContext);
  let params = useParams();
  console.log(params, 'params');
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(
      `https://search.unbxd.io/${unbxdSearchConfig.apiKey}/${unbxdSearchConfig.siteKey}/search?q=*&filter=uniqueId:${params.productId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const {
          response: { products },
        } = data;
        setProduct(products[0]);
        loadRecs();
      });
  }, []);

  return (
    <div className="pdp">
      <section className="product-wrapper">
        {product ? (
          <Card className="hero-product">
            <CardHeader title={product.title} />
            <CardMedia
              component="img"
              image={product.imageUrl[0]}
              alt={product.description}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Skeleton animation="wave" />
        )}
      </section>
      <section className="recs-widget">
        <div id="recommendations1"></div>
        <div id="recommendations"></div>
        <div id="recommendations3"></div>
      </section>
    </div>
  );
}
