import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";

Font.register(
  "http://fonts.gstatic.com/s/nunitosans/v2/iJ4p9wO0GDKJ-D5teKuZqp0EAVxt0G0biEntp43Qt6E.ttf",
  {
    family: "Nunito Sans",
  }
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const BlogPage = ({ prop }) => (
  <PDFViewer>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1 {prop.m}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

const prop = {
  m: "Hello World",
};

ReactDOM.render(<BlogPage prop={prop} />, document.getElementById("root"));

export default BlogPage;

// const BlogPage = () => {
//   return (
//     <div>
//       <PDFDownloadLink
//         document={<MyDocument prop={prop} />}
//         fileName="somename.pdf"
//       >
//         {({ blob, url, loading, error }) =>
//           loading ? "Loading document..." : "Download now!"
//         }
//       </PDFDownloadLink>
//     </div>
//   );
// };
