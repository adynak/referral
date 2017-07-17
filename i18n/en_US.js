var txtLogin = {
    // labels for login page
    onlineID: 'Online ID',
    logIn: 'Log in',
    logOut: 'Logged out successfully',
    password: 'Password',
    passwordConfirm: 'Confirm Password',
    errOnlineID: 'OnlineID is required',
    errPasswordRequired: 'Password is required',
    errPasswordDifferent: 'Passwords Do Not Match!',
    errPasswordInvalid: 'Minimum length is 5 characters.',
    errPassword: 'Minimum length is 55 characters.',
    btnLogin: 'Login',
    btnRegister: 'Register',
    btnLogout: 'Logout',
    btnPasswordHelp: 'Need Login Help?',
    credentialsValid: 'You are now logged in.',
    credentialsInvalid: 'The onlineID or password you have entered is invalid.',
    registrationSuccess: 'Successfully registered',
    registerPageTitle: 'Register'
};

var txtNavigation = {
    brandName: 'Northwest Connect',
    btnLogin: 'Login',
    btnRegister: 'Register',
    btnLogout: 'Logout'
};

var txtRefer = {
    pageTitle: 'Send A New Referral',
    recipient: 'Referal For',
    selectRecipient: 'Select Member',
    temperature: 'Temperature',
    selectTemperature: 'Select Temperature',
    description: 'Description',
    placeholderDesription: 'Describe this referral',
    contactNameFirst: 'Contact First Name',
    contactNameLast: 'Contact Last Name',
    contactOccupation: 'Contact Occupation',
    placeholderOccupation: 'What is their role in the company?',
    phone: 'Contact Phone Number',
    email: 'Contact Email Address',
    location: 'Contact Location',
    placeholderLocation: 'City or Area of Town',
    type: 'Referral Type',
    selectType: 'Select Type',
    delivery: 'Delivery',
    callThem: 'You Call Them',
    callMe: "They'll Call You",
    btnSendReferral: 'Submit Referral',
    btnCancel: 'Cancel',
    inside: 'Inside',
    outside: 'Outside',
    newReferral: 'Your referral nas been sent.'
};

var txtReferrals = {
    gridColumnReferralFrom: 'Referral From',
    gridColumnDescription: 'Description',
    gridColumnDateSent: 'Date Sent To You',
    btnCancel: 'Cancel',
    plurals: [
        {tag: 'You have '},
        {tag: 'no new referrals'},
        {tag: '1 new referral'},
        {tag: 'new referrals'}
    ],
    filterText: 'Filter Referrals by Date Range'
};

var txtReferralDetails = {
    pageTitle: 'Referral From:',
    dateOfReferral: 'Date of Referral',
    description: 'Description',
    contactName: 'Contact Name',
    contactOccupation: 'Contact Occupation',
    contactPhoneNumber: 'Contact Phone Number',
    delivery: 'Delivery',
    contactEmailAddress: 'Contact Email Address',
    location: 'Location of Work',
    type: 'Referral Type',
    temperature: 'Temperature',
    yourProfit: 'How Much Did You Make?',
    markRead: 'Mark Referral as Read',
    closeThisReferral: 'Close This Referral On',
    btnCancel: 'Cancel',
    btnSubmit: 'Done',
    updateReferral: 'Saved updates to referral.'
};

var txtSideMenu = {
    menuRefer: 'Send A Referral',
    menuReferrals: 'Referrals',
    menuActiveMembers: 'Active Members',
    menuReferralsPassed: 'Referrals Passed',
    menuClosedBusiness: 'Closed Business'
};

var txtProfile = {
    pageTitle: 'Update Your Profile',
    onlineID: 'OnlineID',
    errOnlineID: 'OnlineID required',
    password: 'Password',
    errPasswordRequired: 'Password is required',
    errPasswordDifferent: 'Passwords Do Not Match!',
    errPasswordLength: 'Minimum length is 5 characters.',
    passwordConfirm: 'Confirm Password',
    nameFirst: 'First Name',
    errNameFirst: 'Member first name required',
    nameLast: 'Last Name',
    errNameLast: 'Member last name required.',
    nameBusiness: 'Business Name',
    errNameBusiness: 'Member business name required.',
    occupation: 'Occupation',
    errOccupation: 'Member occupation name required.',
    phonePrimary: 'Phone Number',
    errPhonePrimary: 'Phone Number is required.',
    phoneAlternate: 'Alternate Phone Number',
    email: 'Email Address',
    errEmail: 'Must be a valid email address.',
    comment: 'Comment',
    commentOptional: 'Comments (optional)',
    btnSubmit: 'Update',
    btnCancel: 'Cancel',
    updateSuccessful: 'Profile Updated Successfully',
    btnRegister: 'Register'
}

var txtReports = {
    pluralsMembers: [
       {tag: 'No Active Members.'},
        {tag: 'Active Member.'},
        {tag: 'Active Members.'}
    ],
    pluralsClosed: [
        {tag: 'No Closed Referrals.'},
        {tag: 'Closed Referral.'},
        {tag: 'Closed Referrals.'}
    ],
    pluralsPassed: [
        {tag: 'No Passed Referrals.'},
        {tag: 'Passed Referral.'},
        {tag: 'Passed Referrals.'}
    ],
    btnCancel: 'Cancel'  ,
    gridColumnMember: 'Member Name'  ,
    gridColumnCompany: 'Company Name',
    gridColumnEmail: 'Email Address',
    gridColumnDescription: 'Description',
    gridColumnJoined: 'Member Since',
    gridColumnOpened: 'Referral Date',
    gridColumnFrom: 'From',
    gridColumnTo: 'To',
    gridColumnDescription: 'Description',
    gridColumnClosed: 'Date Closed',
    gridColumnValue: 'Value',
    gridColumnTemperature: 'Temperature',
    filterText: 'Filter Referrals by Date Range'
};

// ranges:{
//     'label': [moment call for dateStart, moment call for dateStop]
// }
// refer to moment library for its use

var txtDatePicker = {
    ranges: {
        'Last 7 Days':       [moment().subtract(6,  'days'),  moment()],
        'Last 30 Days':      [moment().subtract(29, 'days'),  moment()],
        'Last 60 Days':      [moment().subtract(59, 'days'),  moment()],
        'Last 90 Days':      [moment().subtract(89, 'days'),  moment()],
        'One Year Trailing': [moment().subtract(364, 'days'), moment()],
        'Year To Date':      [moment().startOf('year'),       moment()],
        'Month To Date':     [moment().startOf('month'),      moment()]
    },
    customRange: 'Custom Range',
    from: 'From',
    to: 'To',
    apply: 'Apply',
    format: 'MM/DD/YYYY',
    cancel: 'Cancel',
    clickToSelect: 'Click To Select A Date',
    daysOfWeek: [
        'Su', 
        'Mo', 
        'Tu', 
        'We', 
        'Th', 
        'Fr', 
        'Sa'
    ],
    monthNames: [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ]    
};

