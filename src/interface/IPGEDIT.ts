/**
 * @interface IPGEDIT
 */
export interface IPGEDIT {

    /**
     * Current active service
     * @memberof IPGEDIT
     */
    activeService: string;

    /**
     * Edit service to edit text.
     * @param e html element.
     * @memberof IPGEDIT
     */
    editService(e: HTMLElement): void;

    /**
     * Highlight service to highlight text.
     * @memberof IPGEDIT
     */
    hightlightService(): void;

    /**
     * Comment service to add comment.
     * @param targetElement target element.
     * @param e mouse event.
     * @memberof IPGEDIT
     */
    commentService(targetElement: HTMLElement, e: MouseEvent): void;

    /**
     * Download service to download page as pdf.
     * @memberof IPGEDIT
     */
    downloadService(): void;

    /**
     * Set current service.
     * @param service current service.
     * @memberof IPGEDIT
     */
    setCurrentService(service: string): void;

    /**
     * Get PGEDIT ui component.
     * @returns PGEDIT component.
     * @memberof IPGEDIT
     */
    getSU_pgeditComponent(): string;

    /**
     * Get comment component.
     * @returns html comment component.
     * @memberof IPGEDIT
     */
    getSU_pgeditCommentElement(): string;
}