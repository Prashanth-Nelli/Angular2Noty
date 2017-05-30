export const notyHtml =  `
    <style>
        .noty-backdrop {
            position: fixed;
            height: 100%;
            width: 100%;
            background-color:#000000;
            opacity: 0.1;
            z-index: 999;
            display: none;
        }
        .noty {
            border-radius: 3px;
            background: #fff;
            position: fixed;
            margin:auto;
            max-width: 45%;
            max-height: 90%;
            overflow-y: hidden;
            overflow-x: auto;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            z-index: 999;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
        }
        .noty-message {
            margin: 30px 100px 30px 30px;
            font-family: Source Sans Pro;
            font-size: 14px;
            min-width: 400px;
            color: #333;
        }
        .noty-cancel {
            position: absolute;
            right: 15px;
            top: 15px;
            cursor: pointer;
        }
        .buttons-pane-right {
            margin-right: 100px;
        }
        .noty-buttons {
            padding: 15px 0;
            border-top: 1px solid #d6d6d6;
            margin: 25px 0 0 35px;
        }
        .btn {
            padding: 5px 10px;
            background-color: #fff;
            color: #a6a6a6;
            border: 1px solid #ccc;
            text-transform: uppercase;
        }
        .btn:hover {
            background-color: #b3b3b3;
            border-color: #b3b3b3;
            color: #333;
            outline: none;
            cursor: pointer;
            text-transform: uppercase;
        }
        .btn:active {
            outline: none;
        }
        .btn:focus {
            outline: none;
        }
        .margin-right {
            margin-right: 10px;
        }
        .error {
            background-color: #f56565 !important;
            color: white !important;
        }
        .warning {
            background-color: #FFF7CC !important;
        }
        .success {
            background-color: #C8E6C9 !important;
        }
    </style>
    <div class="noty-backdrop">
    </div>
    <div class="noty">
        <div class="noty-cancel" style="
            position: absolute; right: 5px; top: 5px; color: #ccc;
            cursor: pointer;
        ">
            &#x2716;
        </div>
        <div class="noty-message" style="padding: 5px;">
            {{message}}
        </div>
        <div class="noty-buttons" style="text-align: right;">
            <button class="noty-btn-cancel btn margin-right">Cancel</button>
            <button class="noty-btn-ok btn buttons-pane-right">Ok</button>
        </div>
    </div>
`;
