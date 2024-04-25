package com.hirokiminami.grtc.demo.web.constant;

public enum LoginResponseStatus {
    OK("ok"),
    ALREADY_EXIST("exist");
    private final String stringValue;
    LoginResponseStatus(String stringValue) { this.stringValue = stringValue; }
}
