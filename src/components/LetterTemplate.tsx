import React from 'react';

interface LetterData {
  letterNumber: string;
  letterContent: string;
  letterhead?: {
    logo?: string;
    header: string;
    subheader?: string;
    address?: string;
  };
  signatures: Array<{
    signature?: string;
    officialName: string;
    officialPosition: string;
    officialNip?: string;
    position: string;
    isAcknowledged: boolean;
    signatureType?: 'digital' | 'barcode';
  }>;
  carbonCopy?: string | string[];
  attachments?: string[];
}

interface LetterTemplateProps {
  data: LetterData;
}

const LetterTemplate = React.forwardRef<HTMLDivElement, LetterTemplateProps>(
  ({ data }, ref) => {
    const { letterContent, letterhead, signatures, carbonCopy, attachments } = data;

    // Check if there are center signatures
    const hasCenterSignatures = signatures.some(
      (sig) => sig.position === 'tengah-atas' || sig.position === 'tengah-bawah'
    );
    const gridColumns = hasCenterSignatures ? 3 : 2;

    // Process carbon copy
    let carbonCopyHtml = '';
    if (carbonCopy) {
      if (Array.isArray(carbonCopy) && carbonCopy.length > 0) {
        carbonCopyHtml = `
          <div class="carbon-copy">
            <b>Tembusan:</b>
            <ol>
              ${carbonCopy.map((cc) => `<li>${cc}</li>`).join('')}
            </ol>
          </div>`;
      } else if (typeof carbonCopy === 'string' && carbonCopy.trim() !== '') {
        carbonCopyHtml = `
          <div class="carbon-copy">
            ${carbonCopy}
          </div>`;
      }
    }

    return (
      <div ref={ref}>
        <style>
          {`
            @media print {
              body { margin: 0; padding: 0; }
              .no-print { display: none; }
            }
            .header-wrapper {
              display: flex;
              align-items: center;
              border-bottom: 4px double #000;
              padding-bottom: 10px;
            }
            .header-logo {
              flex: 0 0 80px;
              margin-right: 15px;
            }
            .header-logo img {
              max-width: 80px;
              max-height: 100px;
              object-fit: contain;
            }
            .header-text {
              flex: 1;
              text-align: center;
              line-height: 1.2;
              margin-right: 80px;
            }
            .header-univ { font-size: 12pt; font-weight: bold; margin: 0; }
            .header-fai { font-size: 14pt; font-weight: bold; margin: 0; }
            .header-address { font-size: 9pt; margin: 0; }
            .letter-container {
              font-family: 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              max-width: 21cm;
              margin: 0 auto;
              background: white;
            }
            .letter-content {
              text-align: justify;
              margin-bottom: 5px;
              min-height: 200px;
            }
            .letter-content p {
              margin-top: 0 !important;
              margin-bottom: 2px !important;
              line-height: 1.5 !important;
              text-indent: 35px;
            }
            .letter-content figure.table {
              margin: 10px 0 !important;
              width: 100% !important;
            }
            .letter-content figure.table p {
              margin: 0 !important;
              text-indent: 0 !important;
            }
            .letter-content table {
              width: 100%;
              border-collapse: collapse;
            }
            .letter-content table td {
              padding: 2px 4px;
              vertical-align: top;
              border: 1px solid #000;
            }
            .signatures {
              display: grid;
              grid-template-columns: repeat(${gridColumns}, 1fr);
              grid-template-rows: auto auto;
              gap: 5px;
            }
            .sig-kiri-atas { grid-column: 1; grid-row: 1; }
            .sig-tengah-atas { grid-column: 2; grid-row: 1; }
            .sig-kanan-atas { grid-column: ${gridColumns === 2 ? 2 : 3}; grid-row: 1; }
            .sig-kiri-bawah { grid-column: 1; grid-row: 2; }
            .sig-tengah-bawah { grid-column: 2; grid-row: 2; }
            .sig-kanan-bawah { grid-column: ${gridColumns === 2 ? 2 : 3}; grid-row: 2; }
            .signature-block {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .acknowledgment-text { font-weight: bold; }
            .signature-wrapper {
              min-height: 65px;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 5px 0;
            }
            .signature-img.signature-digital {
              max-height: 250px !important;
              max-width: 250px;
              width: auto;
              object-fit: contain;
              filter: contrast(1.2) brightness(0.9);
            }
            .signature-img.signature-barcode {
              max-height: 70px !important;
              width: auto;
              padding: 5px;
              background: white;
            }
            .official-position { font-weight: bold; }
            .official-name {
              font-weight: bold;
              font-size: 12pt;
              padding-top: 5px;
            }
            .official-nip { font-size: 10pt; }
            .carbon-copy {
              margin-top: 20px;
              font-size: 10pt;
            }
            .carbon-copy p { margin: 0; }
            .attachment-page {
              page-break-before: always;
              font-family: 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              max-width: 21cm;
              margin: 0 auto;
              background: white;
            }
            .attachment-page img {
              max-width: 100%;
              height: auto;
            }
          `}
        </style>

        <div className="letter-container">
          {letterhead && (
            <div className="header-wrapper">
              {letterhead.logo && (
                <div className="header-logo">
                  <img src={letterhead.logo} alt="Logo" />
                </div>
              )}
              <div className="header-text">
                <p
                  className="header-univ"
                  dangerouslySetInnerHTML={{ __html: letterhead.header }}
                />
                <p
                  className="header-fai"
                  dangerouslySetInnerHTML={{ __html: letterhead.subheader || '' }}
                />
                <p className="header-address">
                  Alamat: <span dangerouslySetInnerHTML={{ __html: letterhead.address || '' }} />
                </p>
                <p className="header-address">Website: http://fai.umgo.ac.id/</p>
              </div>
            </div>
          )}

          <div
            className="letter-content"
            dangerouslySetInnerHTML={{ __html: letterContent }}
          />

          <div className={`signatures ${gridColumns === 2 ? 'two-column' : ''}`}>
            {signatures.map((sig, index) => {
              const sigClass =
                sig.signatureType === 'digital'
                  ? 'signature-digital'
                  : 'signature-barcode';
              const positionClass = `sig-${sig.position}`;
              const hasAcknowledgment = signatures.some((s) => s.isAcknowledged);

              return (
                <div key={index} className={`signature-block ${positionClass}`}>
                  {sig.isAcknowledged ? (
                    <div className="acknowledgment-text">Mengetahui,</div>
                  ) : hasAcknowledgment ? (
                    <div
                      className="acknowledgment-text"
                      style={{ visibility: 'hidden' }}
                    >
                      Mengetahui,
                    </div>
                  ) : null}
                  <div className="official-position">{sig.officialPosition}</div>
                  <div className="signature-wrapper">
                    {sig.signature ? (
                      <img
                        src={sig.signature}
                        alt="Signature"
                        className={`signature-img ${sigClass}`}
                      />
                    ) : (
                      <div style={{ height: '70px' }}></div>
                    )}
                  </div>
                  <div className="official-name">
                    <u>{sig.officialName}</u>
                  </div>
                  {sig.officialNip && (
                    <div className="official-nip">NBM: {sig.officialNip}</div>
                  )}
                </div>
              );
            })}
          </div>

          {carbonCopyHtml && (
            <div dangerouslySetInnerHTML={{ __html: carbonCopyHtml }} />
          )}
        </div>

        {attachments && attachments.length > 0 && (
          <>
            {attachments.map((att, index) => (
              <div
                key={index}
                className="attachment-page"
                dangerouslySetInnerHTML={{ __html: att }}
              />
            ))}
          </>
        )}
      </div>
    );
  }
);

LetterTemplate.displayName = 'LetterTemplate';

export default LetterTemplate;
