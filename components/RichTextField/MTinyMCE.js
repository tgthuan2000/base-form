import React, { useRef } from "react";

// eslint-disable-next-line no-unused-vars

// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

// importing the plugin js.
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/lists";
import "tinymce/plugins/charmap";
import "tinymce/plugins/hr";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/code";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/paste";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/textcolor";
import { TINYMCE_CONFIG } from "../../constants";
import { Editor } from "@tinymce/tinymce-react";

function Index(props) {
    const editorRef = useRef(null);

    return (
        <>
            <Editor
                init={{
                    ...TINYMCE_CONFIG,
                    images_upload_handler: (blobInfo, success, failure) => {
                        // REF: https://youtu.be/wNqwExw-ECw
                        const formData = new FormData();
                        formData.append(
                            "file",
                            blobInfo.blob(),
                            blobInfo.blob().filename
                        );
                        props.uploadImage?.(formData, success, failure);
                    },
                }}
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                }}
                {...props}
            />
        </>
    );
}

export default Index;
