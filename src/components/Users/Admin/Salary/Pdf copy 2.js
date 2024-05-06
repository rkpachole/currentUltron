import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    heading: {
        fontSize: 11,
        fontWeight: 600,
        color: "#131925",
        marginBottom: 4,

    },
    heading2: {
        fontSize: 18,
        fontWeight: 600,
        color: "#131925",
        marginBottom: 8,
        paddingBottom: 15,
        borderBottom: "1px solid #000000",

    },
    heading3: {
        fontSize: 14,
        fontWeight: 600,
        color: "#131925",
        marginBottom: 4,
        paddingBottom: 4,
        borderBottom: "1px solid #000000",

    },
    statement: {
        fontSize: 20,
        color: "#131925",
        lineHeight: 1.4,
        marginBottom: 4,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#999999",
        margin: "24px 0 24px 0"
    },
    paragraph: {
        fontSize: 12,
        color: "#212935",
        lineHeight: 1.67,
    },
    columnParent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    columnStart: {
        flex: 1,
    },
    columnEnd: {
        flex: 1,
        alignItems: "flex-end"
    },
    width25: {
        width: "25%"
    },
    width33: {
        width: "33.3%"
    },
    width50: {
        width: "50%"
    },
    width30: {
        width: "30%"
    },
    width70: {
        width: "70%"
    },

    floatleft: { 
        float: "left"
    },

    margintop15: {
        marginTop: "15"
    },
    margintop13: {
        marginTop: "13"
    },
    box2: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    box46: {
        width: "46%"
    },
    box60: {
        width: "60%"
    },
    font10: {
        fontSize: "10"
    },
    fw_bold: {
        fontWeight: "700"
    }

});

// Create Document Component
function Pdf() {
    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.columnParent}>
                        <View style={styles.columnStart}>
                            <Text style={styles.paragraph}>
                                <img src="https://www.kindpng.com/picc/m/304-3044568_large-dome-logo-hd-png-download.png"/>
                            </Text>
                        </View>
                        <View style={styles.columnEnd}>
                            <Text style={styles.heading}>IMENSO SOFTWARE SOLUTIONS PRIVATE LIMITED</Text>
                            <Text style={[styles.paragraph, styles.font10]}>4A-4B, Ground Floor, Tower B, Spaze iTech Park</Text>
                            <Text style={[styles.paragraph, styles.font10]}>Sohna Road, Sec- 49, Gurugram-122001, INDIA</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.heading2}>EMPLOYEEDETAILS</Text>
                    </View>
                    <View style={styles.columnParent}>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                    </View>

                    <View style={[styles.columnParent, styles.margintop15]}>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                        <View style={styles.width25}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>Employee Name</Text>
                        </View>
                    </View>

                    <View style={[styles.margintop15]}>
                        <Text style={styles.heading2}>SALAR DETAILS</Text>
                    </View>
                    <View style={[styles.columnParent, styles.margintop15]}>
                        <View style={styles.width40}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Days in Month</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>30.0</Text>
                        </View>
                        <View style={styles.width40}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Paid Leaves</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>2.0</Text>
                        </View>
                        <View style={styles.width10}> 
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Unpaid Days</Text>    
                            <Text style={[styles.paragraph, styles.width100]}>2.0</Text>
                        </View>
                    </View>
                    

                    <View style={[styles.box2, styles.margintop15]}>
                        <View style={styles.box46}>
                            <View>
                                <Text style={styles.heading3}>EARNINGS</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>    
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>    
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>    
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>     
                            <View style={[styles.width100, styles.box2, styles.margintop15]}>
                                <Text style={[styles.width70, styles.font10, styles.fw_bold]}>GROSS TOTAL INCOME (A)  </Text>  
                                <Text style={[styles.width30, styles.font10, styles.fw_bold]}>40,000.00</Text>  
                            </View>    
                        </View>  
                        <View style={styles.box46}>
                            <View>
                                <Text style={styles.heading3}>DEDUCTIONS</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>    
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>    
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>    
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>  
                                <Text style={[styles.width30, styles.font10]}>20,000.00</Text>  
                            </View>     
                            <View style={[styles.width100, styles.box2, styles.margintop15]}>
                                <Text style={[styles.width70, styles.font10, styles.fw_bold]}>TOTAL DEDUCTION (B)</Text>  
                                <Text style={[styles.width30, styles.font10]}>40,000.00</Text>  
                            </View>    
                        </View>       
                    </View>
                    
                    <View style={styles.divider}></View>

                    <View style={styles.box2}>
                        <View style={styles.box60}>
                            <View style={[styles.width100, styles.box2, styles.margintop]}>
                                <Text style={[styles.width60, styles.font10, styles.fw_bold]}>NET TOTAL INCOME ( A C ) </Text>  
                                <Text style={[styles.width40, styles.font10, styles.fw_bold]}>40,000.00 (Forty Thousand Only)</Text>  
                            </View>    
                        </View>      
                    </View>

                    <View style={styles.margintop15}>
                        <Text style={styles.paragraph}>Note : All amounts displayed in this payslip are in INR</Text>
                    </View>
                    
                    {/* <View>
                        <Text style={styles.statement}>tetsttss</Text>
                        <Text style={styles.paragraph}>Thank you for your business!</Text>
                    </View> */}
                </View>
            </Page>
        </Document>
    );

}


export default Pdf;

