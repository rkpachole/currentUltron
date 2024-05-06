import React from "react";
import { Page, Font, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import   Logo  from "../../../../assets/images/logo-png.png";
import   plusregular  from "../../../../assets/font/PlusJakartaSans-Regular.ttf";
import   plusmedium  from "../../../../assets/font/PlusJakartaSans-Medium.ttf";
import   Plusbold  from "../../../../assets/font/PlusJakartaSans-Bold.ttf";
import   Plussemibold  from "../../../../assets/font/PlusJakartaSans-SemiBold.ttf";

// import   senre-gular  from "../../../../assets/fonts/Sen-Regular.ttf";
// import   sen-bold  from "../../../../assets/fonts/Sen-Bold.ttf";
// import   senextrabold  from "../../../../assets/fonts/Sen-ExtraBold.ttf";

// new Create styles

Font.register({
    family: "plusregular",
    fonts: [
        {
            src: plusregular,
        },
       
    ],
});

Font.register({
    family: "plusmedium",
    fonts: [
        {
            src: plusmedium,
        },
       
    ],
});

// old Create styles
// Font.register({
//     family: "senre-gular",
//     fonts: [
//         {
//             src: senre-gular,
//         },
       
//     ],
// });

Font.register({
    family: "Plusbold",
    fonts: [
        {
            src: Plusbold,
        },
       
    ],
});

Font.register({
    family: "Plussemibold",
    fonts: [
        {
            src: Plussemibold,
        },
       
    ],
});

  
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        fontFamily: "plusmedium"
    },
    section2: {
        paddingLeft: 50,
        paddingRight: 45,
        paddingTop: 35,
    },
    section: {
        paddingLeft: 50,
        paddingRight: 50,
    },

    textright: {
        textAlign:"right"
    },
    headertext: {
        textAlign: "right"
    },
    heading: {
        fontSize: 11,
        // fontFamily: "Plusbold",
        fontFamily: "Plusbold",
        color: "#131925",
        marginBottom: 4,

    },
    heading2: {
        fontSize: 12,
        fontFamily: "Plusbold",
        color: "#131925",
        marginBottom: 20,
        paddingBottom: 8,
        borderBottom: "1px solid #999999",
        letterSpacing: 0.5,

    },
    heading3: {
        fontSize: 12,
        fontFamily: "Plusbold",
        color: "#131925",
        marginBottom: 4,
        paddingBottom: 4,
        borderBottom: "1px solid #999999",

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
        fontSize: 11,
        color: "#212935",
        lineHeight: 1.67,
        overflowWrap: "break-word"
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
    width20: {
        width: "20%"
    },
    width25: {
        width: "25%"
    },
    width33: {
        width: "33.3%"
    },
    width30: {
        width: "30%"
    },
    width35: {
        width: "35%"
    },
    width40: {
        width: "40%"
    },
    width60: {
        width: "60%"
    },
    width50: {
        width: "50%"
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
    margintop25: {
        marginTop: "30"
    },

    margintop30: {
        marginTop: "30"
    },
    margintop50: {
        marginTop: "50"
    },

    margintop28: {
        marginTop: "28"
    },
    margintop35: {
        marginTop: "35"
    },

    margintop48: {
        marginTop: "48"
    },
    margintop15: {
        marginTop: "15"
    },
    margintop13: {
        marginTop: "13"
    },
    
    marginright10: {
        marginTop: "50px",
        display: "flex"
    },
    generatedpc: {
        textAlign: "center",
        fontSize: "9px"
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
    box100: {
        width: "100%"
    },
    font10: {
        fontSize: "10"
    },
    font11: {
        fontSize: "11"
    },
    font12: {
        fontSize: "12"
    },
    font13: {
        fontSize: "13"
    },
    fw_bold: {
        fontFamily: "Plusbold",
    },
    colorgray: {
        color: "#656363"
    },
    payslipmonth: {
        fontSize: "16",
        textAlign: "center",
        marginTop: "30",
        paddingTop: "30",
        marginBottom: "25",
        borderTop: "1.5px solid #CCCCCC"
    },
    widthLogo:{
        width: "125",
        paddingRight: "5"
    },
    employeename: {
        width: "100%",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#000000",
        fontSize: "12",
        paddingBottom: "15"
    }

});

function INRFormate(item){
    if(item!=""  && item>0)
    {
        return Number(item).toFixed(0);
    }

    return 0;
}

// Create Document Component
function Pdf(props) {
    return (

        <Document title={props.userInfo.employeeName}>
            <Page size="A4" style={styles.page}>
                <View style={styles.section2}>
                    <View style={styles.columnParent}>
                        <View style={[styles.width30, {marginTop: 7,}]}>
                            <Image src={Logo} style={styles.widthLogo}/>
                        </View>
                        <View style={[styles.width70, styles.headertext]}>
                            <Text style={styles.heading}>IMENSO SOFTWARE SOLUTIONS PRIVATE LIMITED </Text>
                            <Text style={[styles.paragraph, styles.font11]}>4A-4B, Ground Floor, Tower B, Spaze iTech Park</Text>
                            <Text style={[styles.paragraph, styles.font11]}>Sohna Road, Sec- 49, Gurugram-122001, INDIA</Text>
                        </View>
                    </View>
                </View>    
                <View style={styles.payslipmonth}>
                    <Text><Text style={styles.fw_bold}>PAYSLIP </Text>-<Text styles={{}} > {props.userInfo.month.toUpperCase()} {props.userInfo.year}</Text></Text>
                    
                </View>
                <View style={[styles.section]}>
                    <View>
                        <Text style={[styles.heading2, styles.employeename ]}>{props.userInfo.employeeName}</Text>
                    </View>
                    <View style={styles.columnParent}>
                        <View style={{width: "25%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Employee ID</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.employeeId}</Text>
                        </View>
                        <View style={{width: "30%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Designation</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold, {lineHeight:1.5}]} >{props.userInfo.designation}</Text>
                        </View>
                        <View style={{width: "25%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Joining Date</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.joiningDate}</Text>
                        </View>
                        <View style={{width: "20%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Department</Text>
                            {/* <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.department}</Text> */}
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold, {lineHeight:1.5}]}>{props.userInfo.department}</Text>
                            
                        </View>
                    </View>

                    <View style={[styles.columnParent, styles.margintop15]}>
                        <View style={{width: "25%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Payment Mode</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.paymentMode}</Text>
                        </View>
                        <View style={{width: "30%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Bank</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold, {lineHeight:1.5}]}>{props.userInfo.bank}</Text>
                        </View>
                        <View style={{width: "25%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Account Number</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.accountNumber}</Text>
                        </View>
                        <View style={{width: "20%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>PAN Number</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.panNumber}</Text>
                        </View>
                    </View>

                    <View style={[styles.margintop28]}>
                        <Text style={[styles.heading2, styles.colorgray]}>SALARY DETAILS</Text>
                    </View>
                    <View style={[styles.columnParent]}>
                        <View style={{width: "25%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Days in Month</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.dayInMonth}</Text>
                        </View>
                        <View style={{width: "30%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Paid Leaves</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.paidLeave}</Text>
                        </View>
                        <View style={{width: "25%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Unpaid Days</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.unpaidDays}</Text>
                        </View>
                        <View style={{width: "20%"}}>
                            <Text style={[styles.paragraph, styles.width100, styles.font10]}>Paid Days</Text>
                            <Text style={[styles.paragraph, styles.width100, styles.fw_bold]}>{props.userInfo.dayInMonth - props.userInfo.unpaidDays}</Text>
                        </View>
                    </View>


                    <View style={[styles.box2, styles.margintop25]}>
                        <View style={styles.box46}>
                            <View>
                                <Text style={styles.heading3}>EARNINGS</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font11]}>BASIC </Text>
                                <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.basic)}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font11]}>HRA </Text>
                                <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.hra)}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font11]}>Special/Variable Allowance </Text>
                                <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.special)}</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop48]}>
                                <Text style={[styles.width70, styles.font10, styles.fw_bold]}>GROSS TOTAL INCOME (A)  </Text>
                                <Text style={[styles.width30, styles.font10, styles.fw_bold, styles.textright]}>{INRFormate(props.userInfo.total)  }</Text>
                            </View>
                        </View>
                        <View style={styles.box46}>
                            <View>
                                <Text style={styles.heading3}>DEDUCTIONS</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font11]}>Leaves </Text>
                                <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.leaveDeducation) }</Text>
                            </View>
                            <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                <Text style={[styles.width70, styles.font11]}>TDS </Text>
                                <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.tdsDeducation)}</Text>
                            </View>
                            { props.userInfo.pf_check == true &&
                                <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                    <Text style={[styles.width70, styles.font11]}> PF </Text>
                                    <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.pfDeduction)}</Text>
                                </View>
                            }
                            { props.userInfo.pf_check != true &&
                                <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                    <Text style={[styles.width70, styles.font11]}>  </Text>
                                </View>
                            }
                            { props.userInfo.esic_check == true &&
                                <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                    <Text style={[styles.width70, styles.font11]}> ESIC </Text>
                                    <Text style={[styles.width30, styles.font11, styles.textright]}>{INRFormate(props.userInfo.esIcDeduction)}</Text>
                                </View>
                            }
                            { props.userInfo.esic_check != true &&
                                <View style={[styles.width100, styles.box2, styles.margintop13]}>
                                    <Text style={[styles.width70, styles.font11]}>  </Text>
                                </View>
                            }
                            <View style={[styles.width100, styles.box2, styles.margintop20]}>
                                <Text style={[styles.width70, styles.font10, styles.fw_bold]}>TOTAL DEDUCTION (B)</Text>
                                <Text style={[styles.width30, styles.font11, styles.fw_bold, styles.textright]}>{INRFormate(props.userInfo.totalDeduction)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider}></View>

                    <View style={styles.box2}>
                        <View style={styles.box100}>
                            {/* <View style={[styles.width100, styles.box2, styles.margintop]}>
                                <Text style={[styles.width60, styles.font11, styles.fw_bold]}>NET TOTAL INCOME (A C) </Text>
                                <Text style={[styles.width40, styles.font11, styles.fw_bold]}> ({INRFormate(props.userInfo.netTotalIncome)})</Text>
                            </View> */}
                            <View style={[styles.width100, styles.box2, styles.margintop]}>
                                <Text style={[styles.width40, styles.font10, styles.fw_bold]}>NET TOTAL INCOME (A - B) </Text>
                                <Text style={[styles.width60, styles.font11]}>
                                    <Text style={[ styles.font11, styles.fw_bold]}>{INRFormate(props.userInfo.netTotalIncome)}</Text>
                                    {/* <Text style={[ styles.font11]}> ({props.digitConvert})</Text> */}
                                </Text>
                            </View>
                            <View style={{marginTop: 15, width: "100%" }}>
                                <view style={[styles.width100, styles.box2, styles.margintop]}>
                                    <Text style={[styles.width40, styles.font10, styles.fw_bold]}>NET SALARY IN WORDS </Text>
                                    <Text style={{fontSize: 11, width: "60%"}}>
                                        {/* <Text style={[ styles.font11, styles.fw_bold]}>Net Salary in Words</Text> */}
                                        <Text> {props.digitConvert} </Text>
                                    </Text>
                                </view>     
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop: 33, textAlign:"center" }}>
                        <Text style={styles.paragraph}>Note : All amounts displayed in this payslip are in INR</Text>
                    </View>
                    <View style={{marginTop: 5 }}>
                        <Text style={[styles.paragraph, styles.generatedpc]}> *This is computer generated statement, does not require signature </Text>
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

