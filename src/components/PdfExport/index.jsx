import React, { useContext } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import HeaderContext from '../../contexts/HeaderContext';

import Oswald from '../../fonts/Y_TKV6o8WovbUd3m_X9aAA.ttf';
import PdfBorder from '../PdfBorder';

Font.register({
  family: 'Oswald',
  src: Oswald,
  // src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
// Create styles
const styles = StyleSheet.create({
  page: { flexDirection: 'row' },
  section: { margin: '0.7cm' },
  sectionTexto: {
    paddingLeft: '2px',
    fontFamily: 'Oswald',
    fontSize: 12,
    textAlign: 'justify',
  },
  sectionTextoMenor: { paddingLeft: '2px', fontFamily: 'Oswald', fontSize: 12 },
  sectionTitle: {
    marginBottom: '16px',
    fontFamily: 'Oswald',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '90%',
    lineHeight: 1,
  },
  borderLandscape: {
    height: '0.4cm',
    marginTop: '0.1cm',
    marginBottom: '0.1cm',
  },
  borderHeader: { width: '0.4cm', marginLeft: '0.1cm', marginRight: '0.1cm' },
  borderPortrait: { width: '0.4cm', marginLeft: '0.1cm', marginRight: '0.1cm' },
});

const Landscape = () => {
  const {
    inputEscola,
    inputProfessor,
    inputTurma,
    inputData,
    imageFile,
    imageQtd,
    inputTitulo,
    header,
    orientation,
    imageFileTwo,
    qtdImageFileTwo,
    inputAluno,
    border,
    especificoTamanho,
    especificoHeight,
    especificoWidth,
  } = useContext(HeaderContext);

  var myloop = [];
  var imagesTwo = [];
  var espMyloop = [];
  let qtd = parseInt(imageQtd);
  let divHeight = '';
  let divWidth = '';
  var isHeader = header;
  var isEspTam = especificoTamanho;
  var qtdAltura = '';
  var qtdLargura = '';

  if (orientation == 'landscape') {
    if (!isNaN(imageQtd)) {
      if (qtd == 1) {
        divHeight = '100%';
        divWidth = '100%';
        isHeader;
      } else if (qtd == 2) {
        divHeight = '100%';
        divWidth = '50%';
        isHeader;
      } else if (qtd == 4) {
        divHeight = '50%';
        divWidth = '50%';
        isHeader;
      } else if (qtd == 6) {
        isHeader = false;
        divHeight = '33.33%';
        divWidth = '50%';
      } else if (qtd == 8) {
        isHeader = false;
        divHeight = '25%';
        divWidth = '50%';
      } else if (qtd == 10) {
        isHeader = false;
        divHeight = '20%';
        divWidth = '50%';
      } else if (qtd == 10) {
        isHeader = false;
        divHeight = '16.6%';
        divWidth = '50%';
      } else if (qtd == 12) {
        isHeader = false;
        divWidth = '50%';
        divHeight = '16.6%';
      }
    } else {
      if (qtd == 1) {
        divHeight = '100%';
        divWidth = '100%';
        isHeader;
      } else if (qtd == 2) {
        divHeight = '50%';
        divWidth = '100%';
        isHeader;
      } else if (qtd == 4) {
        divHeight = '50%';
        divWidth = '50%';
        isHeader;
      } else if (qtd == 6) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '33.33%';
      } else if (qtd == 8) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '25%';
      } else if (qtd == 10) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '20%';
      } else if (qtd == 12 && imageQtd.length == 3) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '16.6%';
      } else if (qtd == 12 && imageQtd.length == 4) {
        isHeader = false;
        divHeight = '33.33%';
        divWidth = '25%';
      }
    }
  } else {
    if (!isNaN(imageQtd)) {
      if (qtd == 1) {
        divHeight = '100%';
        divWidth = '100%';
        isHeader;
      } else if (qtd == 2) {
        divHeight = '100%';
        divWidth = '50%';
        isHeader;
      } else if (qtd == 4) {
        divHeight = '50%';
        divWidth = '50%';
        isHeader;
      } else if (qtd == 6) {
        isHeader = false;
        divHeight = '33.33%';
        divWidth = '50%';
      } else if (qtd == 8) {
        isHeader = false;
        divHeight = '25%';
        divWidth = '50%';
      } else if (qtd == 10) {
        isHeader = false;
        divHeight = '20%';
        divWidth = '50%';
      } else if (qtd == 12) {
        isHeader = false;
        divWidth = '50%';
        divHeight = '16.6%';
      }
    } else {
      if (qtd == 1) {
        divHeight = '100%';
        divWidth = '100%';
        isHeader;
      } else if (qtd == 2) {
        divHeight = '50%';
        divWidth = '100%';
        isHeader;
      } else if (qtd == 4) {
        divHeight = '50%';
        divWidth = '50%';
        isHeader;
      } else if (qtd == 6) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '33.33%';
      } else if (qtd == 8) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '25%';
      } else if (qtd == 10) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '20%';
      } else if (qtd == 12 && imageQtd.length == 3) {
        isHeader = false;
        divHeight = '50%';
        divWidth = '16.6%';
      } else if (qtd == 12 && imageQtd.length == 4) {
        isHeader = false;
        divHeight = '33.33%';
        divWidth = '25%';
      }
    }
  }

  qtdImageFileTwo == 2 && (qtd == 2 || 4) ? (qtd = qtd / 2) : (qtd = qtd);
  const subllinhadoLandscape =
    '______________________________________________________________________.';
  const subllinhadoPortrait =
    '_________________________________________________.';

  function espTamImg() {
    if (orientation == 'portrait') {
      /* 28.2 altura e 19.5 largura */
      divHeight = (especificoHeight * 100) / 28.2 + '%';
      divWidth = (especificoWidth * 100) / 19.5 + '%';

      qtdAltura = Math.floor(28.2 / especificoHeight);
      qtdLargura = Math.floor(19.5 / especificoWidth);
      qtd = qtdAltura * qtdLargura;
    } else {
      /* 19.5 altura e 28.2 largura */
      divHeight = (especificoHeight * 100) / 19.5 + '%';
      divWidth = (especificoWidth * 100) / 28.2 + '%';

      qtdAltura = Math.floor(28.2 / especificoWidth);
      qtdLargura = Math.floor(19.5 / especificoHeight);
      qtd = qtdAltura * qtdLargura;
    }
  }

  if (isEspTam == false) {
    for (let i = 1; i <= qtd; i++) {
      myloop.push(
        <View style={{ width: divWidth, height: divHeight }} key={i}>
          {border != 0 ? (
            <PdfBorder
              border={border}
              size="landscape"
              orientation={orientation}
              css="borderLandscape"
              top="top"
            />
          ) : null}

          {isHeader ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '100%',
                marginBottom: '8px',
              }}
            >
              {border != 0 ? (
                <PdfBorder border={border} size="header" css="borderHeader" />
              ) : null}

              <View style={{ width: '100%' }}>
                <Text
                  style={
                    orientation == 'landscape'
                      ? styles.sectionTexto
                      : styles.sectionTextoMenor
                  }
                >
                  {inputEscola}
                </Text>

                <Text
                  style={
                    orientation == 'landscape'
                      ? styles.sectionTexto
                      : styles.sectionTextoMenor
                  }
                >
                  {inputProfessor}
                </Text>

                {inputAluno != '' ? (
                  <Text style={styles.sectionTexto}>
                    {inputAluno}{' '}
                    {orientation == 'landscape'
                      ? subllinhadoLandscape
                      : subllinhadoPortrait}
                  </Text>
                ) : null}

                {inputTurma != '' ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '4px',
                    }}
                  >
                    <Text
                      style={[
                        orientation == 'landscape'
                          ? styles.sectionTexto
                          : styles.sectionTextoMenor,
                        { width: '65%', paddingTop: '4px' },
                      ]}
                    >
                      {inputTurma}
                    </Text>
                    <Text
                      style={[
                        orientation == 'landscape'
                          ? styles.sectionTexto
                          : styles.sectionTextoMenor,
                        { width: '35%', paddingTop: '4px' },
                      ]}
                    >
                      {inputData}
                    </Text>
                  </View>
                ) : null}

                {inputTitulo != '' ? (
                  <View style={{ width: '100%' }}>
                    <Text style={styles.sectionTitle}> {inputTitulo}</Text>
                  </View>
                ) : null}
              </View>

              {border != 0 ? (
                <PdfBorder
                  border={border}
                  size="header"
                  right={true}
                  css="borderHeader"
                />
              ) : null}
            </View>
          ) : null}

          <View
            style={{ display: 'flex', flexDirection: 'row', height: '100%' }}
          >
            {border != 0 ? (
              <PdfBorder
                border={border}
                size="portrait"
                css="lapisPortrait"
                qtd={qtd}
                qtdImageFileTwo={qtdImageFileTwo}
              />
            ) : null}
            {imageFile ? (
              <Image
                style={{ height: '100%', width: '100%' }}
                src={imageFile}
              />
            ) : (
              <View style={{ width: '100%' }}></View>
            )}
            {border != 0 ? (
              <PdfBorder
                border={border}
                size="portrait"
                right={true}
                css="lapisPortrait"
                qtd={qtd}
                qtdImageFileTwo={qtdImageFileTwo}
              />
            ) : null}
          </View>

          {border != 0 ? (
            <PdfBorder
              border={border}
              size="landscape"
              orientation={orientation}
              css="borderLandscape"
            />
          ) : null}
        </View>
      );
    }

    if (qtdImageFileTwo == 2 && (qtd == 2 || 4)) {
      for (let u = 0; u < qtd; u++) {
        imagesTwo.push(
          <View style={{ width: divWidth, height: divHeight }} key={u}>
            {border != 0 ? (
              <PdfBorder
                border={border}
                size="landscape"
                orientation={orientation}
                css="borderLandscape"
                top="top"
              />
            ) : null}

            {isHeader ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '8px',
                }}
              >
                {border != 0 ? (
                  <PdfBorder border={border} size="header" css="borderHeader" />
                ) : null}

                <View style={{ width: '100%' }}>
                  <Text
                    style={
                      orientation == 'landscape'
                        ? styles.sectionTexto
                        : styles.sectionTextoMenor
                    }
                  >
                    {inputEscola}
                  </Text>
                  <Text
                    style={
                      orientation == 'landscape'
                        ? styles.sectionTexto
                        : styles.sectionTextoMenor
                    }
                  >
                    {inputProfessor}
                  </Text>

                  {inputAluno != '' ? (
                    <Text
                      style={
                        orientation == 'landscape'
                          ? styles.sectionTexto
                          : styles.sectionTextoMenor
                      }
                    >
                      {inputAluno}{' '}
                      {orientation == 'landscape'
                        ? subllinhadoLandscape
                        : subllinhadoPortrait}
                    </Text>
                  ) : null}

                  {inputTurma != '' ? (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '4px',
                      }}
                    >
                      <Text
                        style={[
                          orientation == 'landscape'
                            ? styles.sectionTexto
                            : styles.sectionTextoMenor,
                          { width: '65%', paddingTop: '4px' },
                        ]}
                      >
                        {inputTurma}
                      </Text>
                      <Text
                        style={[
                          orientation == 'landscape'
                            ? styles.sectionTexto
                            : styles.sectionTextoMenor,
                          { width: '35%', paddingTop: '4px' },
                        ]}
                      >
                        {inputData}
                      </Text>
                    </View>
                  ) : null}

                  {inputTitulo != '' ? (
                    <View style={{ width: '100%' }}>
                      <Text style={styles.sectionTitle}> {inputTitulo}</Text>
                    </View>
                  ) : null}
                </View>

                {border != 0 ? (
                  <PdfBorder
                    border={border}
                    size="header"
                    right={true}
                    css="borderHeader"
                  />
                ) : null}
              </View>
            ) : null}

            <View
              style={{ display: 'flex', flexDirection: 'row', height: '100%' }}
            >
              {border != 0 ? (
                <PdfBorder
                  border={border}
                  size="portrait"
                  css="lapisPortrait"
                  qtd={qtd}
                  qtdImageFileTwo={qtdImageFileTwo}
                />
              ) : null}
              {imageFileTwo ? (
                <Image
                  style={{ height: '100%', width: '100%' }}
                  src={imageFileTwo}
                />
              ) : (
                <View style={{ width: '100%' }}></View>
              )}
              {border != 0 ? (
                <PdfBorder
                  border={border}
                  size="portrait"
                  right={true}
                  css="lapisPortrait"
                  qtd={qtd}
                  qtdImageFileTwo={qtdImageFileTwo}
                />
              ) : null}
            </View>

            {border != 0 ? (
              <PdfBorder
                border={border}
                size="landscape"
                orientation={orientation}
                css="borderLandscape"
              />
            ) : null}
          </View>
        );
      }
    }
  } else {
    espTamImg();
    for (let i = 1; i <= qtd; i++) {
      espMyloop.push(
        <View style={{ width: divWidth, height: divHeight }} key={i}>
          <View
            style={{ display: 'flex', flexDirection: 'row', height: '100%' }}
          >
            {imageFile ? (
              <Image
                style={{ height: '100%', width: '100%' }}
                src={imageFile}
              />
            ) : null}
          </View>
        </View>
      );
    }
  }

  var merge = myloop.concat(imagesTwo, espMyloop);

  return merge;
};

// Create Document Component
const PdfExport = () => {
  const { orientation } = useContext(HeaderContext);

  const PdfOrientation = orientation;
  let pdfWidth = '28.2cm';
  let pdfHeight = '20cm';

  if (PdfOrientation == 'landscape') {
    pdfWidth = '28.2cm';
    pdfHeight = '19.5cm';
  } else {
    pdfWidth = '19.5cm';
    pdfHeight = '28.2cm';
  }

  return (
    <Document title="Atividades-por-Folha">
      <Page size="A4" style={styles.page} orientation={PdfOrientation}>
        <View style={styles.section}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: pdfWidth,
              height: pdfHeight,
            }}
          >
            <Landscape />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfExport;
