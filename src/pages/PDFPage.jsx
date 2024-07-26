import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import { saveAs } from "file-saver";

Font.register(
  "http://fonts.gstatic.com/s/nunitosans/v2/iJ4p9wO0GDKJ-D5teKuZqp0EAVxt0G0biEntp43Qt6E.ttf",
  {
    family: "Nunito Sans",
  }
);

const MyDoc = ({ invoiceData }) => {
  return (
    // <div style={containerStyle}>
    //   {/* <PDFViewer style={viewerStyle}> */}
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={"../assets/react.svg"} />
          <View style={styles.invoiceDetails}>
            <Text style={styles.title}>INVOICE</Text>
            <View style={styles.detailRow}>
              <Text style={[styles.subTitle, { fontWeight: "bold" }]}>
                Invoice ID:
              </Text>
              <Text style={styles.subTitle}>{invoiceData.invoiceId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.subTitle}>Invoice Date:</Text>
              <Text style={styles.subTitle}>{invoiceData.invoiceDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.subTitle}>Due Date:</Text>
              <Text style={styles.subTitle}>{invoiceData.dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.propertyDetails}>
          <Text style={styles.heading}>PROPERTY: {invoiceData.property}</Text>
          <Text style={styles.heading}>UNIT: {invoiceData.unit}</Text>
        </View>

        <View style={styles.billingInfo}>
          <View>
            <Text style={styles.heading}>BILL TO:</Text>
            {/* <Text style={styles.subTitle}>{invoiceData.billTo.name}</Text> */}
            <Text style={styles.subTitle}>{invoiceData.billTo.address}</Text>
            <Text style={styles.subTitle}>{invoiceData.billTo.email}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.heading}>BILL FROM:</Text>
            <Text style={styles.subTitle}>{invoiceData.billFrom.name}</Text>
            <Text style={styles.subTitle}>{invoiceData.billFrom.email}</Text>
            <Text style={styles.subTitle}>{invoiceData.billFrom.phone}</Text>
            <Text style={styles.subTitle}>{invoiceData.billFrom.vat}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol}>DESCRIPTION</Text>
            <Text style={[styles.tableCol, { textAlign: "right" }]}>RATE</Text>
            <Text style={[styles.tableCol, { textAlign: "right" }]}>QTY</Text>
            <Text style={[styles.tableCol, { textAlign: "right" }]}>TOTAL</Text>
          </View>
          {invoiceData.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {item.description}
              </Text>
              <Text
                style={[
                  styles.tableCol,
                  styles.tableCell,
                  { textAlign: "right" },
                ]}
              >
                ${item.rate.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.tableCol,
                  styles.tableCell,
                  { textAlign: "right" },
                ]}
              >
                {item.quantity}
              </Text>
              <Text
                style={[
                  styles.tableCol,
                  styles.tableCell,
                  { textAlign: "right" },
                ]}
              >
                ${item.total.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalsColumn}>
            <View style={styles.totalRow}>
              <Text
                style={[styles.totalText, { fontSize: 12, fontWeight: "bold" }]}
              >
                SUB-TOTAL
              </Text>
              <Text
                style={[styles.totalText, { fontSize: 12, fontWeight: "bold" }]}
              >
                ${invoiceData.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text
                style={[styles.totalText, { fontSize: 12, fontWeight: "bold" }]}
              >
                TAX (20%)
              </Text>
              <Text
                style={[styles.totalText, { fontSize: 12, fontWeight: "bold" }]}
              >
                ${invoiceData.tax.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.totalRow, styles.totalAmount]}>
              <Text
                style={[
                  styles.totalText,
                  { color: "white", fontSize: 15, fontWeight: "bold" },
                ]}
              >
                TOTAL
              </Text>
              <Text
                style={[
                  styles.totalText,
                  { color: "white", fontSize: 15, fontWeight: "bold" },
                ]}
              >
                ${invoiceData.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.heading}>PAYMENT DETAILS</Text>
          <Text style={styles.subTitle}>{invoiceData.paymentDetails.name}</Text>
          <Text style={styles.subTitle}>
            {invoiceData.paymentDetails.address}
          </Text>
          <Text style={styles.subTitle}>
            {invoiceData.paymentDetails.email}
          </Text>
        </View>

        <View style={styles.notes}>
          <Text style={styles.heading}>NOTES</Text>
          <Text style={styles.subTitle}>{invoiceData.notes}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Generated {invoiceData.generatedDate}</Text>
          <Text>Powered by XYZ</Text>
        </View>
      </Page>
    </Document>
    //   </PDFViewer>
    // </div>
  );
};

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const viewerStyle = {
  width: "80%",
  height: "80%",
};

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "white",
    // fontFamily: "Nunito Sans",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1F2937",
    paddingTop: 5,
  },
  invoiceDetails: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  propertyDetails: {
    marginTop: 20,
    marginBottom: 20,
  },
  billingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  table: {
    flexDirection: "column",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F97316",
    color: "white",
    padding: 5,
    borderRadius: 4,
    fontSize: 15,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 5,
  },
  tableCol: {
    width: "40%",
  },
  tableCell: {
    fontSize: 10,
  },
  totals: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "33%",
    marginBottom: 5,
  },
  totalAmount: {
    backgroundColor: "#F97316",
    color: "white",
    padding: 6,
    borderRadius: 4,
  },
  totalsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totalsColumn: {
    width: "35%",
  },
  totalText: {
    padding: 3,
  },
  paymentDetails: {
    marginTop: 20,
  },
  notes: {
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#6B7280",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
    fontSize: 8,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

const invoiceData = {
  invoiceId: "124354",
  invoiceDate: "01/07/2024",
  dueDate: "01/07/2024",
  property: "86123",
  unit: "F2-18",
  billTo: {
    name: "Laravel LLC.",
    address: "102, San-Francisco, CA, USA",
    email: "info@laravel.com",
  },
  billFrom: {
    name: "Tailwind Inc.",
    email: "sales@tailwindcss.com",
    phone: "+41-442341232",
    vat: "VAT: 8657671212",
  },
  items: [
    { description: "Rent - June 2024", rate: 100.0, quantity: 1, total: 100.0 },
    { description: "Rent - June 2024", rate: 100.0, quantity: 1, total: 100.0 },
    { description: "Service Charge", rate: 200.0, quantity: 2, total: 400.0 },
    { description: "Service Charge", rate: 200.0, quantity: 2, total: 400.0 },
  ],
  subtotal: 900.0,
  tax: 180.0,
  total: 1080.0,
  paymentDetails: {
    name: "Laravel LLC.",
    address: "102, San-Francisco, CA, USA",
    email: "info@laravel.com",
  },
  notes:
    "Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.",
  generatedDate: "07/17/2024 05:28:46",
};

const PDFPage = () => {
  return (
    <div>
      <PDFDownloadLink
        document={<MyDoc invoiceData={invoiceData} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
};
export default PDFPage;
