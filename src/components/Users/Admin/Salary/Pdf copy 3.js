import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
    },
    section2: {
        padding: 20,
    },
    section: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    heading: {
        fontSize: 11,
        fontWeight: 600,
        color: "#131925",
        marginBottom: 4,

    },
    heading2: {
        fontSize: 14,
        fontWeight: 600,
        color: "#131925",
        marginBottom: 20,
        paddingBottom: 8,
        borderBottom: "1px solid #000000",

    },
    heading3: {
        fontSize: 13,
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

    margintop20: {
        marginTop: "20"
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
    },
    colorgray: {
        color: "#656363"
    },
    payslipmonth: {
        fontSize: "20",
        textAlign: "center",
        marginTop: "30",
        paddingTop: "30",
        marginBottom: "30",
        borderTop: "1px solid #CCCCCC"
    },

});

// Create Document Component
function Pdf(props) {
    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section2}>
                    <View style={styles.columnParent}>
                        <View style={styles.columnStart}>
                            <Text style={styles.paragraph}>
                                {/* <img src={Logo} /> */}
                            </Text>
                        </View>
                        <View style={styles.columnEnd}>
                            <Text style={styles.heading}>IMENSO SOFTWARE SOLUTIONS PRIVATE LIMITED</Text>
                            <Text style={[styles.paragraph, styles.font10]}>4A-4B, Ground Floor, Tower B, Spaze iTech Park</Text>
                            <Text style={[styles.paragraph, styles.font10]}>Sohna Road, Sec- 49, Gurugram-122001, INDIA</Text>
                        </View>
                    </View>
                </View>    
                <View style={styles.payslipmonth}>
                    <Text><Text style={styles.fw_bold}>PAYSLIP -</Text>  JAN 2022</Text>
                </View>
                <View style={styles.section}>
                    <View>
                        <Text style={[styles.heading2, styles.colorgray]}>EMPLOYEE DETAILS</Text>
                    </View>
                    <View style={styles.columnParent}>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee Name</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.employeeName}</Text>
                        </View>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Designation</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.designation}</Text>
                        </View>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Joining Date</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.joiningDate}</Text>
                        </View>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Department</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.department}</Text>
                        </View>
                    </View>

                    <View style={[styles.columnParent, styles.margintop15]}>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Payment Mode</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.paymentMode}</Text>
                        </View>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Bank</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.bank}</Text>
                        </View>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Account Number</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.accountNumber}</Text>
                        </View>
                        <View style={styles.width25}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>PAN Number</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.panNumber}</Text>
                        </View>
                    </View>

                    <View style={[styles.margintop20]}>
                        <Text style={[styles.heading2, styles.colorgray]}>SALAR DETAILS</Text>
                    </View>
                    <View style={[styles.columnParent]}>
                        <View style={styles.width40}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Days in Month</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.dayInMonth}</Text>
                        </View>
                        <View style={styles.width40}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Paid Leaves</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.paidLeave}</Text>
                        </View>
                        <View style={styles.width10}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Unpaid Days</Text>
                            <Text style={[styles.paragraph, styles.width100]}>{props.userInfo.unpaidDays}</Text>
                        </View>
                    </View>


                    <View style={[styles.box2, styles.margintop20]}>
                        <View style={styles.box46}>
                            <View>
                                <Text style={styles.heading3}>EARNINGS</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.basic}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>HRA </Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.hra}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>Special/ Variable Allowance </Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.special}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop20]}>
                                <Text style={[styles.width70, styles.font10, styles.fw_bold]}>GROSS TOTAL INCOME (A)  </Text>
                                <Text style={[styles.width30, styles.font10, styles.fw_bold]}>{props.userInfo.total }</Text>
                            </View>
                        </View>
                        <View style={styles.box46}>
                            <View>
                                <Text style={styles.heading3}>DEDUCTIONS</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>BASIC </Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.basicDeducation}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>HRA </Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.hraDeducation}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font10]}>Special/ Variable Allowance </Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.specialDeduction}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop20]}>
                                <Text style={[styles.width70, styles.font10, styles.fw_bold]}>TOTAL DEDUCTION (B)</Text>
                                <Text style={[styles.width30, styles.font10]}>{props.userInfo.totalDeduction}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider}></View>

                    <View style={styles.box2}>
                        <View style={styles.box60}>
                            <View style={[styles.width100, styles.box2, styles.margintop]}>
                                <Text style={[styles.width60, styles.font10, styles.fw_bold]}>NET TOTAL INCOME ( A C ) </Text>
                                <Text style={[styles.width40, styles.font10, styles.fw_bold]}>{props.userInfo.netTotalIncome} (Forty Thousand Only)</Text>
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

