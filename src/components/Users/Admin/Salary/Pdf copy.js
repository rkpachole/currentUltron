import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        width: "100%",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        borderTop: "1px solid #EEE",
        paddingTop: 8,
        paddingBottom: 8,
    },
    header: {
        borderTop: "none",
    },
    bold: {
        fontWeight: "bold",
    },
    row1: {
        width: "27%",
    },
    row2: {
        width: "15%",
    },
    row3: {
        width: "15%",
    },
    row4: {
        width: "20%",
    },
    row5: {
        width: "27%",
    },
    paysliptext: {
        textAlign: "center",
        marginBottom: "15",
        marginTop: "20",
    },
    employeedetail: {
        display: "flex",
        justifyContent: "space-between"
    },
    font13: {
        fontSize: "13",
        width: "100%"
    },
    font18: {
        fontSize: "18"
    },
    width100: {
        width: "100%"
    }
   
});

// Create Document Component
function Pdf() {
    return (
        
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.employeedetail}>
                        <View style={{ backgroundColor:"red", width:"100"}}><Text>Logo</Text> </View> 
                        <View style={{ backgroundColor:"blue", width:"100"}}>
                            <Text style={styles.font13}>IMENSO SOFTWARE SOLUTIONS PRIVATE LIMITED</Text>
                            <Text style={styles.font13}>4A-4B, Ground Floor, Tower B, Spaze iTech Park Sohna Road, Sec- 49, Gurugram-122001, INDIA</Text>
                        </View> 
                    </View>
                    <Text style={styles.paysliptext}> <Text style={{fontWeight: "bold"}}> PAYSLIP </Text> - JAN 2022</Text>
                    <View style={styles.row}>
                        <Text style={[styles.employeedetail]}>
                            <Text style={[styles.font13, styles.row5]}>
                                 Employee Name
                            </Text>
                            <Text style={[styles.font18, styles.row]}>
                                 John Doe
                            </Text>
                        </Text>
                        <Text style={[styles.employeedetail]}>
                            <Text style={[styles.font13, styles.row5]}>
                                 Employee Name
                            </Text>
                            <Text style={[styles.font18, styles.row]}>
                                 John Doe
                            </Text>
                        </Text>
                        <Text style={[styles.employeedetail]}>
                            <Text style={[styles.font13, styles.row5]}>
                                 Employee Name
                            </Text>
                            <Text style={[styles.font18, styles.row]}>
                                 John Doe
                            </Text>
                        </Text>
                        <Text style={[styles.employeedetail]}>
                            <Text style={[styles.font13, styles.row5]}>
                                 Employee Name
                            </Text>
                            <Text style={[styles.font18, styles.row]}>
                                 John Doe
                            </Text>
                        </Text>
                    </View>
                    
                </View>   
               
            </Page>
        </Document>
    );
    
}


export default Pdf;
