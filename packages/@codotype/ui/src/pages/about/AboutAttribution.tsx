import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { GitHubStar } from "@src/components/GitHubStar";
import { GitHubFollow } from "@src/components/GitHubStar/GitHubStar";

// // // //

/**
 * AboutAttribution
 */
export function AboutAttribution() {
    return (
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
                <GitHubStar />
            </div>

            <div className="col-lg-12 d-flex justify-content-center">
                <p className="lead mb-0 mt-4">
                    <span>Built with </span>
                    <FontAwesomeIcon icon={faHeart} className="text-danger" />
                    <span className="px-1">by</span>
                    <a href="https://github.com/aeksco" target="_blank">
                        @aeksco
                    </a>
                </p>
            </div>

            <div className="col-lg-12 d-flex justify-content-center pt-3">
                <GitHubFollow />
            </div>
        </div>
    );
}
